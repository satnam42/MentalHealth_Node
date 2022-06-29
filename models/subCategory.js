"use strict";
const mongoose = require("mongoose");

const subCategory = mongoose.Schema({
    name: { type: String, required: true, trim: true, },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});

mongoose.model("subCategory", subCategory);
module.exports = subCategory;