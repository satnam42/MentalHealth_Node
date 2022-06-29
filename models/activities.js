"use strict";
const mongoose = require("mongoose");
const activities = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    actions: [
        {
            name: {
                type: String,
                required: true
            },
            ans: {
                type: String,
                required: true
            },
            date: { type: Date, default: Date.now },
            _id: false
        },
    ],

}, { timestamps: true });
mongoose.model("activities", activities);
module.exports = activities;