import {model, Schema, Document } from "mongoose";

export interface StatsInt extends Document{
    group_id: Number,
	course_id: Number,
	participation_percentage: Number,
	approbation_percentage: Number,
	average_grade: Number,
	standard_deviation: Number,
	best_grade: Number,
	worst_grade: Number
}

const statsSchema = new Schema ({
    group_id:{
        type: Number,
        require:true
    },
	course_id:{
        type:Number,
        require:true
    },
	participation_percentage:{
        type:Number,
        require:true
    },
	approbation_percentage:{
        type:Number,
        require:true
    },
	average_grade:{
        type:Number,
        require:true
    },
	standard_deviation:{
        type:Number,
        require:true
    },
	best_grade:{
        type:Number,
        require:true
    },
	worst_grade:{
        type:Number,
        require:true
    }
});

export default model<StatsInt>('Stats', statsSchema)