
var moment = require('moment'); // require

const create = async (body, context) => {
    const log = context.logger.start("services:score:create");
    let sDate = moment(body.date).startOf('day').toISOString()
    let eDate = moment(body.date).endOf('day').toISOString()
    let score = await db.score.findOne({
        date: { $gte: sDate, $lte: eDate }, user: body.userId, category: body.categoryId
    });
    if (score) {
        score.details = body.details
        await score.save()
    } else {
        const score = await new db.score({
            user: body.userId,
            details: body.details,
            date: body.date,
            category: body.categoryId,
        }).save();
    }
    log.end();
    return score;

};

const list = async (context) => {
    const log = context.logger.start(`services:score:list`);
    let allCategories = await db.subCategory.find();
    log.end();
    return allCategories;
};



exports.create = create;
exports.list = list;
