"use strict";
const service = require("../services/activities");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:activities:activity`);
    try {
        const value = await service.addActivity(req.body, req.context);
        const message = "activity added Successfully";
        log.end();
        return response.success(res, message, value);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;