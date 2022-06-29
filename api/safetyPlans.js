"use strict";
const service = require("../services/safetyPlans");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:safetyPlans:create`);
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



exports.create = create;

