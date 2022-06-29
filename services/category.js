
const create = async (body, context) => {
    const log = context.logger.start("services:category:create");
    let categoryModel = {}
    categoryModel.name = body.name
    const catRes = await new db.category(categoryModel).save();
    log.end();
    return catRes;
};

const list = async (context) => {
    const log = context.logger.start(`services:category:category`);
    let allCategories = await db.category.find();
    log.end();
    return allCategories;
};



exports.create = create;
exports.list = list;
