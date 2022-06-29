"use strict";


const imageUrl = require('config').get('image').url

exports.toModel = entity => {
    const model = {
        id: entity._id,
        quotes: entity.quotes,
        motivationalIdeas: entity.motivationalIdeas,
        imageUrl: entity.imageName ? `${imageUrl}${entity.imageName}` : ""
    };
    return model;

};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};