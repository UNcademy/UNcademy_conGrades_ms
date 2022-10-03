"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const statsSchema = new mongoose_1.Schema({
    group_id: {
        type: Number,
        require: true
    },
    course_id: {
        type: Number,
        require: true
    },
    participation_percentage: {
        type: Number,
        require: true
    },
    aprobation_percentage: {
        type: Number,
        require: true
    },
    average_grade: {
        type: Number,
        require: true
    },
    standart_deviation: {
        type: Number,
        require: true
    },
    best_grade: {
        type: Number,
        require: true
    },
    worst_grade: {
        type: Number,
        require: true
    }
});
exports.default = (0, mongoose_1.model)('Stats', statsSchema);
