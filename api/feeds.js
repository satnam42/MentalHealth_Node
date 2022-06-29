"use strict";
const service = require("../services/feeds");
const response = require("../exchange/response");
const feedMapper = require("../mappers/feeds");
const create = async (req, res) => {
    const log = req.context.logger.start(`api:feeds:create`);
    try {
        const feed = await service.add(req.files, req.body, req.context);
        const message = "feeds Added Successfully";
        log.end();
        return response.success(res, message, feedMapper.toModel(feed));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getList = async (req, res) => {
    const log = req.context.logger.start(`api:feeds:getfeeds`);
    try {
        const feeds = await service.list(req.context);
        const message = "feeds fetched Successfully";
        log.end();
        return response.success(res, message, feedMapper.toSearchModel(feeds));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.create = create;
exports.getList = getList;
