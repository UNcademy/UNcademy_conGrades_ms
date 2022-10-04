import {model, Schema, Document } from "mongoose";

export interface StatsInt extends Document{
    group_id: Number,
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
	participation_percentage:{
        type:Number,
        require:true
    },
	approbation_percentage:{
        type:Number,
        require:true
    },
	average_grade:{
        type:Number
    },
	standard_deviation:{
        type:Number
    },
	best_grade:{
        type:Number
    },
	worst_grade:{
        type:Number
    }
});

export default model<StatsInt>('Stats', statsSchema)