"use strict";
const mongoose = require("mongoose");
const feed = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    quotes: { type: String, default: "", trim: true, },
    imageName: { type: String, trim: true, },
    motivationalIdeas: { type: String, default: "", trim: true, },
},
    { timestamps: true });
mongoose.model("feed", feed);
module.exports = feed;