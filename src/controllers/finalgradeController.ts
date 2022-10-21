import {Request, Response} from 'express';
import FinalGrade from '../model/finalgrade';
import { statsCreate } from './stastController';

export const finalGradeReaderByGroup = async (req:Request, res:Response) => {
    const id_group = req.params.id
    const finalGrade = await FinalGrade.find({group_id:id_group})
    res.send(finalGrade)
}

export const finalGradeReaderByGroupAndStudent = async(req:Request, res:Response) => {
    const id_group = req.params.groupId
    const name_student = req.params.studentName
    const finalGrade = await FinalGrade.find({group_id:id_group, student_name:name_student})
    res.send(finalGrade)
}

export const finalGradeReaderByStudent = async (req:Request, res:Response) => {
    const name_student = req.params.studentName
    const finalGrade = await FinalGrade.find({student_name: name_student})
    res.send(finalGrade)
}

export const finalGradeCreate = async (req:Request, res:Response) => {
    let fails:{[name: string]: number}={}
    for (let i=0; i<req.body.length;i++) {
        let element = req.body[i]
        let thisGrade:number = +element.grade
        let approvedVal = true;
        let reason = null;
        if (await FinalGrade.findOne({student_name:element.studentName}) && !Number.isNaN(thisGrade)){
            const thisFinalGrade = await FinalGrade.findOne({student_name:element.studentName})
            let newVal = (element.weight*element.grade)/100
            newVal = Number(thisFinalGrade?.final_grade) + Number(newVal)
            if (newVal < 30){
                approvedVal = false;
                if (element.absences > 8){
                    reason = "Absences and Grades"
                }
                else{
                    reason = "Grades"
                }
            }
            else if(element.absences < 8){
                approvedVal = true;
                reason = null;
            }
            await FinalGrade.findOneAndUpdate({student_name:element.studentName},{final_grade: newVal, approved:approvedVal, reason:reason})
        }
        else{
            let finalVal:number
            if(Number.isNaN(thisGrade)){
                finalVal = element.grade
                if (element.grade == "Reprobada"){
                    approvedVal = false;
                    reason = "Grades"
                }
            }
            else {
                finalVal = (element.weight * element.grade) / 100;
                if (finalVal < (element.weight * 30) / 100) {
                    approvedVal = false;
                    reason = "Grades"
                }
            }
            if (element.absences > 8){
                approvedVal = false;
                if (reason == null){
                    reason = "Absences";
                }
                else{
                    reason = "Absences and Grades"
                }
            }
            const name_student = String(element.studentName)
            fails[name_student] = element.absences
            const finalGrade = new FinalGrade({
                group_id: element.courseGroup,
                student_name: element.studentName,
                final_grade:finalVal,
                absences: element.absences,
                approved:approvedVal,
                reason:reason
            });
            await finalGrade.save();
        }
    }
    let course_id = req.body[0]
    course_id = course_id.courseGroup
    const listCourse = await FinalGrade.find({group_id:course_id})
    await statsCreate(listCourse, fails)
    res.send('Done')
}