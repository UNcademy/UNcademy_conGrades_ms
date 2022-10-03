"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const finalGradeSchema = new mongoose_1.Schema({
    group_id: {
        type: Number,
        require: true
    },
    student_name: {
        type: String,
        require: true
    },
    final_grade: {
        type: String,
        require: true
    },
    approved: {
        type: Boolean,
        require: true
    }
});
exports.default = (0, mongoose_1.model)('FinalGrade', finalGradeSchema);
