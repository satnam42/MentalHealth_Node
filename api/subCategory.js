"use strict";
const service = require("../services/subCategory");
const response = require("../exchange/response");
//const userMapper = require("../mappers/category");

//create category api
const create = async (req, res) => {
    const log = req.context.logger.start(`api:category:create`);
    try {
        const user = await service.create(req.body, req.context);
        const message = "sub Category Added Successfully";
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
    const log = req.context.logger.start(`api:category:getList`);
    try {
        const category = await service.list(req.context);
        const message = "categories fetched Successfully";
        log.end();
        return response.success(res, message, category);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getListByCateId = async (req, res) => {
    const log = req.context.logger.start(`api:category:getList`);
    try {
        const category = await service.listByCateId(req.params.id, req.context);
        const message = "categories fetched Successfully";
        log.end();
        return response.success(res, message, category);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.getList = getList;
exports.getListByCateId = getListByCateId;
