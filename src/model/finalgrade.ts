import {model, Schema, Document } from "mongoose";

export interface FinalGradeInt extends Document{
    group_id: Number,
    course_id:Number,
    student_id: Number,
    final_grade: Number,
    approved: Boolean
}

const finalGradeSchema = new Schema ({
    group_id:{
        type: Number,
        require: true,
    },
    course_id:{
        type: Number,
        require: true,
    },
    student_id:{
        type: Number,
        require: true,
    },
    final_grade:{
        type: String,
        require: true,
    },
    approved:{
        type: Boolean,
        require:true
    }
});

export default model<FinalGradeInt>('FinalGrade', finalGradeSchema)