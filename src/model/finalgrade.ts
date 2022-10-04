import {model, Schema, Document } from "mongoose";

export interface FinalGradeInt extends Document{
    group_id: Number,
    student_name: String,
    final_grade: String,
    absences:Number,
    approved: Boolean,
    reason:String
}

const finalGradeSchema = new Schema ({
    group_id:{
        type: Number,
        require: true
    },
    student_name:{
        type: String,
        require: true
    },
    final_grade:{
        type: String,
        require: true
    },
    absences:{
        type:Number,
        require:true
    },
    approved:{
        type: Boolean,
        require:true
    },
    reason:{
        type: String
    }
});

export default model<FinalGradeInt>('FinalGrade', finalGradeSchema)