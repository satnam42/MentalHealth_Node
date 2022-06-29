
"use strict";

var _ = require('underscore');
var moment = require('moment'); // require
exports.toModel = entity => {
    const model = {
        name: entity[0].name,
        today: moment(new Date()).format('L')
    };

    let dates = []
    let daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let dayCount = 0
    let subCats = []

    for (let entityDay of entity[0].actions) {
        dayCount++
        if (dayCount <= entity[0].actions.length) {
            for (let i = 0; i < entityDay.length; i++) {
                subCats.push({
                    name: entityDay[i].name,
                    ans: entityDay[i].ans,
                    date: moment(entityDay[i].date).format('dddd'),
                })
            }
        }

    }

    let groupedSubCats = _.groupBy(subCats, 'name')

    for (let subCat in groupedSubCats) {
        let count = 0
        for (let subCatScore of groupedSubCats[subCat]) {
            count++
            let day = {}
            for (let dayName of daysName) {
                // adding  dummy days  
                if (groupedSubCats[subCat].length >= count) {
                    if (count == groupedSubCats[subCat].length && groupedSubCats[subCat].length > 1) {
                        for (let i = 0; i < dates.length; i++) {
                            if (dates[i].name == subCatScore.name && dates[i].date == subCatScore.date && dates[i].ans == "") {
                                dates[i].ans = subCatScore.ans
                            }
                        }
                    } else {
                        if (dayName == subCatScore.date) {
                            day = {
                                name: subCatScore.name,
                                ans: subCatScore.ans,
                                date: subCatScore.date
                            }
                            dates.push(day)
                        } else {
                            day = {
                                name: subCatScore.name,
                                ans: "",
                                date: dayName
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