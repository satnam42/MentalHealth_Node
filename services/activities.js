var moment = require('moment'); // require
const activityBuild = async (model, context) => {
    const log = context.logger.start(`services:activities:activityBuild${model}`);
    today = new Date()
    let sDate = moment(today).startOf('day').toISOString()
    let eDate = moment(today).endOf('day').toISOString()

    let activities = await db.activities.findOne({
        createdAt: { $gte: sDate, $lte: eDate }, user: model.userId,
    });

    if (activities) {
        activities.actions = model.actions
        await activities.save()
    } else {
        const { userId, actions, createdAt } = model;
        let actModel = {
            user: userId,
            actions: actions,
            createdAt: createdAt
        }
        activities = await new db.activities(actModel).save();
    }
    log.end();
    return activities;
};

const addActivity = async (model, context) => {
    const log = context.logger.start(`services:activities:addActivity${model}`);
    const active = await activityBuild(model, context);
    log.end();
    return active;
};

exports.addActivity = addActivity;