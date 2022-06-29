"use strict";
const mongoose = require("mongoose");
const safetyPlan = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    step1: {
        point: { type: String, default: "", trim: true, }
    },
    step2: {
        point: { type: String, default: "", trim: true, }
    },
    step3: {
        name: { type: String, default: "", trim: true, },
        contactNo: { type: String, default: "", trim: true, },
        place: { type: String, default: "", trim: true, },
        name1: { type: String, default: "", trim: true, },
        contactNo1: { type: String, default: "", trim: true, },
        place1: { type: String, default: "", trim: true, },
    },
    step4: {
        name: { type: String, default: "", trim: true, },
        contactNo: { type: String, default: "", trim: true, },
        name1: { type: String, default: "", trim: true, },
        contactNo1: { type: String, default: "", trim: true, },
        name2: { type: String, default: "", trim: true, },
        contactNo2: { type: String, default: "", trim: true, }
    },
    step5: {
        clinicianName: { type: String, default: "", trim: true, },
        contactNo: { type: String, default: "", trim: true, },
        emergencContact: { type: String, default: "", trim: true, },
        clinicianName1: { type: String, default: "", trim: true, },
        contactNo1: { type: String, default: "", trim: true, },
        emergencContact1: { type: String, default: "", trim: true, },
        localUrgentCareService: { type: String, default: "", trim: true, },
        urgentCareServiceAddress: { type: String, default: "", trim: true, },
        urgentCareServicePhone: { type: String, default: "", trim: true, }
    },
    step6: {
        point: { type: String, default: "", trim: true, }
    },
    step7: {
        makingTheEnvironmentSafe: { type: String, default: "", trim: true, }
    },

}, { timestamps: true }

);
mongoose.model("safetyPlan", safetyPlan);
module.exports = safetyPlan;