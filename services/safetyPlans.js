var moment = require('moment'); // require
const create = async (model, context) => {
    const log = context.logger.start("services:safetyPlans:create");
    today = new Date()
    let sDate = moment(today).startOf('day').toISOString()
    let eDate = moment(today).endOf('day').toISOString()
    let safetyPlan = await db.safetyPlan.findOne({
        createdAt: { $gte: sDate, $lte: eDate }, user: model.userId,
    });
    if (safetyPlan) {
        safetyPlan.step1 = model.step1
        safetyPlan.step2 = model.step2
        safetyPlan.step3 = model.step3
        safetyPlan.step4 = model.step4
        safetyPlan.step5 = model.step5
        safetyPlan.step6 = model.step6
        safetyPlan.step7 = model.step7
        await safetyPlan.save()
    } else {
        safetyPlan = await new db.safetyPlan({
            user: model.userId,
            step1: model.step1,
            step2: model.step2,
            step3: model.step3,
            step4: model.step4,
            step5: model.step5,
            step6: model.step6,
            step7: model.step7,
        }).save();
    }
    log.end();
    return safetyPlan;
};

exports.create = create;
