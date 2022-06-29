"use strict";

const express = require("express");
const appConfig = require("config").get("app");
const ObjectId = require('mongodb').ObjectID
const path = require("path");
var moment = require('moment'); // require
const activityMapper = require('./mappers/activity')
const pafMapper = require('./mappers/pdf')
const logger = require("@open-age/logger")("server");
const Http = require("http");
const port = process.env.PORT || appConfig.port || 3000;
const app = express();
var pdf = require('html-pdf');
var fs = require('fs');
var options = {
    format: 'Letter',
    pageRanges: '1'
};
app.use(express.static(__dirname + '/templates'));
var server = Http.createServer(app);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.engine('html', require('ejs').renderFile);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.get('/generatePDF/:id', async (req, res) => {

    let today = new Date
    let sdate = moment(today).endOf('day').toISOString()
    let lastWeekDay = moment(today).subtract(7, 'days').startOf('day').toISOString()

    let pdfData = await db.score.aggregate([
        { $addFields: { scoredate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } } },
        { $match: { user: ObjectId(req.params.id), scoredate: { $gt: lastWeekDay, $lt: sdate } }, },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { "$unwind": "$user" },
        {
            $lookup: {
                from: "subcategories",
                localField: "details.subCategory",
                foreignField: "_id",
                as: "subCategory"
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "subCategory.category",
                foreignField: "_id",
                as: "category",
            }
        },
        { "$unwind": "$category" },
        {
            $group: {
                _id: { "category": "$category.name" },
                name: { $addToSet: "$user.userName" },
                days: {
                    $push:
                    {
                        "scores": { "no": "$details.no", "name": "$subCategory.name", },
                        "cDate": "$date"
                    }
                }
            }
        },
        { "$unwind": { "path": "$name" } },
        {
            "$project": {
                "_id": 0,
                "category": "$_id.category",
                "name": "$name",
                "days": "$days",

            }
        },
    ])
    let mappedPdfData = pafMapper.toSearchModel(pdfData)
    console.log("pdfData length", mappedPdfData.length)

    if (mappedPdfData.length < 1) {
        return res.status(400).send("data not found")
    }
    else {
        buildPdf(res, 'pdf', mappedPdfData, './pdfUploads/score.pdf')
    }
})

app.get('/generate/activities/pdf/:id', async (req, res) => {
    let today = new Date
    let sdate = moment(today).endOf('day').toISOString()
    let lastWeekDay = moment(today).subtract(7, 'days').startOf('day').toISOString()
    //weekly report pdf
    let pdfData = await db.activities.aggregate([
        { $addFields: { scoredate: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } } },
        { $match: { user: ObjectId(req.params.id), scoredate: { $gte: lastWeekDay, $lte: sdate } }, },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { "$unwind": "$user" },
        {
            $group: {
                _id: "$actions.name",
                name: { $addToSet: "$user.userName" }, actions: { $push: "$actions" }
            },

        },
        { "$unwind": { "path": "$name" } },
        {
            "$project": {
                "_id": 0,
                "name": "$name",
                "actions": "$actions",

            }
        },
    ])
    let mappedPdfData = activityMapper.toModel(pdfData)
    console.log("pdfData length", mappedPdfData.length)

    if (mappedPdfData.length < 1) {
        return res.status(400).send("data not found")
    }
    else {
        buildPdf(res, 'activity', mappedPdfData, './pdfUploads/activity.pdf')
    }
})
app.get('/generate/safetyPlans/pdf/:id', async (req, res) => {
    let today = new Date

    let startOf = moment(today).startOf('day').toISOString()
    let endOf = moment(today).endOf('day').toISOString()
    const pdfData = await db.safetyPlan.findOne({
        createdAt:
            { $gte: startOf, $lte: endOf },
        user: ObjectId(req.params.id),
    }).populate("user", "userName")


    // aggregate([
    //     { $addFields: { date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } } },
    //     { $match: { user: ObjectId(req.params.id), date: { $not: { $type: 9 } }, date: { $gte: startOf, $lte: endOf } }, },
    //     {
    //         $lookup: {
    //             from: "users",
    //             localField: "user",
    //             foreignField: "_id",
    //             as: "user"
    //         }
    //     },
    //     { "$unwind": "$user" },
    //     {
    //         "$project": {
    //             "_id": 0,
    //             "name": " $user.userName",
    //             "step1": 1,
    //             "step2": 1,
    //             "step3": 1,
    //             "step4": 1,
    //             "step5": 1,
    //             "step6": 1,
    //             "step7": 1
    //         }
    //     },
    // ])
    console.log("pdfData length", pdfData)
    if (!pdfData) {
        return res.status(400).send("data not found")
    }
    else {
        buildPdf(res, 'safetyPlan', pdfData, './pdfUploads/safetyPlan.pdf')

    }
})

const buildPdf = (res, name, data, path) => {
    console.log("pdfData", data)
    res.render(name, {
        info: data,
    }, function (err, HTML) {
        if (err) {
            console.log('err to read', err)
        }
        else {
            fs.unlink(path, (err => {
                if (err) console.log('unlink Err', err);
                else {
                    console.log("\nDeleted file: pdf");
                }
            }));
        }
        pdf.create(HTML, options).toFile(path, function (err, result) {
            if (err) {
                console.log('pdf create', err);
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            var datafile = fs.readFileSync(path);
            res.header('content-type', 'application/pdf');
            res.send(datafile);
        })
    })

}


const boot = () => {
    const log = logger.start("app:boot");
    log.info(`environment:  ${process.env.NODE_ENV}`);
    log.info("starting server");
    server.listen(port, () => {
        log.info(`listening on port: ${port}`);
        log.end();
    });
};

const init = async () => {
    await require("./settings/database").configure(logger);
    await require("./settings/express").configure(app, logger);
    await require("./settings/routes").configure(app, logger);
    boot();
};

init();