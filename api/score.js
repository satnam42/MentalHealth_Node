"use strict";
const service = require("../services/score");
const response = require("../exchange/response");
//const userMapper = require("../mappers/score");

//create score api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:score:create`);
    try {
        const user = await service.create(req.body, req.context);
        const message = " Score Added Successfully";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


// showcategories
const getList = async (req, res) => {
    const log = req.context.logger.start(`api:score:getList`);
    try {
        const score = await service.list(req.context);
        const message = "score fetched Successfully";
        log.end();
        return response.success(res, message, score);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
// showcategories
const getPdf = async (req, res) => {
    const log = req.context.logger.start(`api:score:getPdf`);
    try {
        const pdf = await service.generatePdf(res, req.params.id, req.context);
        log.end();
        return response.data(res, pdf);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.getList = getList;
exports.getPdf = getPdf;
