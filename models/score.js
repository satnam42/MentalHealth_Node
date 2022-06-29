"use strict";
const mongoose = require("mongoose");
const score = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    details: [
        {
            subCategory: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "subCategory"
            },
            no: {
                type: String, default: "0",

            },
            _id: false
        }
    ],
    date: { type: Date, default: Date.now },


});
mongoose.model("score", score);
module.exports = score;