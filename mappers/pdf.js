"use strict";

var _ = require('underscore');
var moment = require('moment'); // require
exports.toModel = entity => {
    const model = {
        name: entity.name,
        category: entity.category,
        today: moment(new Date()).format('L')
    };
    let dates = []
    let daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let dayCount = 0
    let subCats = []

    for (let entityDay of entity.days) {
        dayCount++
        if (dayCount <= entity.days.length) {
            for (let i = 0; i < entityDay.scores.name.length; i++) {
                subCats.push({
                    name: entityDay.scores.name[i],
                    score: entityDay.scores.no[i],
                    date: moment(entityDay.cDate).format('dddd'),
                })
            }
        }

    }

    let groupedSubCats = _.groupBy(subCats, 'name')
    for (let subCat in groupedSubCats) {
        let count = 0
        let dayCount = 0
        for (let subCatScore of groupedSubCats[subCat]) {
            count++
            let day = {}

            for (let dayName of daysName) {
                // adding  dummy days  
                if (groupedSubCats[subCat].length >= count) {
                    if (dayCount == 7) {
                        for (let i = 0; i < dates.length; i++) {
                            if (dates[i].name == subCatScore.name && dates[i].day == subCatScore.date && dates[i].no !== subCatScore.score) {
                                dates[i].no = subCatScore.score
                            }

                        }
                    }
                    else {
                        if (dayName == subCatScore.date) {
                            dayCount++
                            day = {
                                name: subCatScore.name,
                                day: subCatScore.date,
                                no: subCatScore.score
                            }
                            dates.push(day)
                        } else {
                            dayCount++
                            day = {
                                name: subCatScore.name,
                                day: dayName,
                                no: "0"
                            }
                            dates.push(day)
                        }
                    }
                }
            }
        }
    }

    let groupedDates = _.groupBy(dates, 'name')
    model.days = groupedDates

    return model;

};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};