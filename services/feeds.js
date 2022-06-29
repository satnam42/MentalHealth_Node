
const buildFeed = async (body, context) => {
    const log = context.logger.start("services:feeds:buildFeed");
    let model = {}
    model.user = body.userId
    model.imageName = body.imageName
    model.quotes = body.quotes
    model.motivationalIdeas = body.motivationalIdeas
    const feed = await new db.feed(model).save();
    log.end();
    return feed;
};

const list = async (context) => {
    const log = context.logger.start(`services:feeds:list`);
    let feeds = await db.feed.find();
    log.end();
    return feeds;
};

const add = async (files, model, context) => {
    const log = context.logger.start(`services:feeds:imageUpload`);
    if (files !== undefined && files.length >= 1) {
        let fileName = files[0].filename.replace(/ /g, '') // remove space from string
        model.imageName = fileName
    }
    const feed = await buildFeed(model, context);
    log.end();
    return feed
};

exports.add = add;
exports.list = list;
