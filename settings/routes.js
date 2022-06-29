"use strict";

const fs = require("fs");
const path = require("path");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const validator = require("../validators");

const configure = (app, logger) => {
    const log = logger.start("settings:routes:configure");
    app.get("/specs", function (req, res) {
        fs.readFile("./public/specs.html", function (err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                });
            }
            res.contentType("text/html");
            res.send(data);
        });
    });


    app.get("/api/specs", function (req, res) {
        res.contentType("application/json");
        res.send(specs.get());
    });

    //user api's //
    app.post(
        "/api/users/create",
        permit.context.builder,
        validator.users.create,
        api.users.create
    );

    app.post(
        "/api/users/login",
        permit.context.builder,
        validator.users.login,
        api.users.login
    );

    app.get(
        "/api/users/currentUser/:id",
        permit.context.validateToken,
        api.users.currentUser
    );

    app.get(
        "/api/users/getById/:id",
        permit.context.builder,
        api.users.getById
    );

    app.put(
        "/api/users/changePassword/:id",
        permit.context.validateToken,
        api.users.changePassword,
        validator.users.changePassword,
    );

    app.put(
        "/api/users/update/:id",
        permit.context.validateToken,
        api.users.update
    );
    app.get(
        "/api/users/search",
        permit.context.validateToken,
        api.users.search
    );

    app.post(
        "/api/users/forgotPassword",
        permit.context.builder,
        api.users.forgotPassword
    );

    app.delete(
        "/api/users/delete/:id",
        permit.context.builder,
        api.users.deleteUser
    );

    app.get(
        "/api/users/getUsers",
        permit.context.validateToken,
        api.users.getUsers
    );

    //category api

    app.post(
        "/api/category/create",
        permit.context.builder,
        api.category.create
    );

    app.get(
        "/api/category/list",
        permit.context.builder,
        api.category.getList
    );

    //Activity api's
    app.post(
        "/api/activities/add",
        permit.context.builder,
        api.activities.create
    );

    //sub subCategory api's
    app.post(
        "/api/subCategory/create",
        permit.context.builder,
        api.subCategory.create
    );

    app.get(
        "/api/subCategory/list",
        permit.context.builder,
        api.subCategory.getList
    );
    app.get(
        "/api/subCategory/listByCatId/:id",
        permit.context.builder,
        api.subCategory.getListByCateId
    );
    // score api's
    app.post(
        "/api/score/create",
        permit.context.builder,
        api.score.create
    );

    app.get(
        "/api/score/list",
        permit.context.builder,
        api.score.getList
    );
    app.post(
        "/api/safetyPlans/add",
        permit.context.builder,
        api.safetyPlans.create
    );

    app.post(
        "/api/feeds/add",
        permit.context.builder,
        api.feeds.create
    );
    app.get(
        "/api/feeds/list",
        permit.context.builder,
        api.feeds.getList
    );
    log.end();
};

exports.configure = configure;