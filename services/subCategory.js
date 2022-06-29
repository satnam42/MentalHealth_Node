
const create = async (body, context) => {
    const log = context.logger.start("services:category:create");
    let categoryModel = {}
    categoryModel.name = body.name
    categoryModel.category = body.categoryId
    const catRes = await new db.subCategory(categoryModel).save();
    log.end();
    return catRes;
};

const list = async (context) => {
    const log = context.logger.start(`services:category:category`);
    let allCategories = await db.subCategory.find();
    log.end();
    return allCategories;
};
const listByCateId = async (id, context) => {
    const log = context.logger.start(`services:subCategory:listByCateId`);
    if (!id) {
        throw new Error('category id is required')
    }
    let allCategories = await db.subCategory.find({ category: id }).populate('category');
    log.end();
    return allCategories;
};


exports.create = create;
exports.list = list;
exports.listByCateId = listByCateId;
