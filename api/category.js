"use strict";
const service = require("../services/category");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:category:create`);
    try {
        const user = await service.create(req.body, req.context);
        const message = "Category Added Successfully";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const createSubCategory = async (req, res) => {
    const log = req.context.logger.start(`api:categories:createSubCategory`);
    try {
        const category = await service.createSubCategory(req.body, req.context);

        log.end();
        return response.data(res, category);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getList = async (req, res) => {
    const log = req.context.logger.start(`api:category:category`);
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

const showsubcategory = async (req, res) => {
    const log = req.context.logger.start(`api:category:showsubcategory`);
    try {
        const category = await service.showsubcategory(req.params.id, req.context);
        const message = "subcategories fetched Successfully";
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
exports.showsubcategory = showsubcategory;
exports.createSubCategory = createSubCategory;
