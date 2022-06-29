"use strict";
const mongoose = require("mongoose");

const user = mongoose.Schema({
    userName: { type: String, required: true, trim: true, },
    email: { type: String, required: true, trim: true, },
    password: { type: String, required: true, trim: true, },
    dob: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    country: { type: String, default: "" },
    token: { type: String, default: "" }, //access token
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    deviceToken: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
/* correct method for saving coordinates in mongodb */
// user.index({ "loc": "2dsphere" });
/* correct method for google like search in user collection*/
// user.index({ "loc": "2dsphere" });
mongoose.model("user", user);
module.exports = user;