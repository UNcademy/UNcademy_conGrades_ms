"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const statsSchema = new mongoose_1.Schema({
    group_id: {
        type: Number,
        require: true
    },
    participation_percentage: {
        type: Number,
        require: true
    },
    approbation_percentage: {
        type: Number,
        require: true
    },
    average_grade: {
        type: Number
    },
    standard_deviation: {
        type: Number
    },
    best_grade: {
        type: Number
    },
    worst_grade: {
        type: Number
    }
});
exports.default = (0, mongoose_1.model)('Stats', statsSchema);
