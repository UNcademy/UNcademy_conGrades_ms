import {Request, Response} from 'express';
import Finalgrade from '../model/finalgrade';
import { statsCreate } from './stastController';

export const finalgradeReaderByGroup = async (req:Request, res:Response) => {
    const id_group = req.params.id
    const finalgrade = await Finalgrade.find({group_id:id_group})
    res.send(finalgrade)
}

export const finalgradeReaderByStudent = async(req:Request, res:Response) => {
    const id_group = req.params.groupId
    const id_student = req.params.studentId
    const finalgrade = await Finalgrade.find({group_id:id_group, student_id:id_student})
    res.send(finalgrade)
}

export const finalgradeCreate = async (req:Request, res:Response) => {
    let fails:{[name: string]: number}={}
    for (let i=0; i<req.body.length;i++) {
        let element = req.body[i]
        if (await Finalgrade.findOne({student_id:element.id_estudiante})){
            const thisFinalGrade = await Finalgrade.findOne({student_id:element.id_estudiante})
            let newVal = (element.porcentaje*element.valor_numerico)/100
            newVal = Number(thisFinalGrade?.final_grade) + Number(newVal)
            let approvedVal = true;
            if (newVal < 3 && thisFinalGrade?.approved != false){
                approvedVal = false;
            }
            await Finalgrade.findOneAndUpdate({student_id: element.id_estudiante},{final_grade: newVal, approved:approvedVal})
        }
        else{
            const finalVal = (element.porcentaje*element.valor_numerico)/100;
            let approvedVal = true;
            if (finalVal < 3 || element.fallas > 8){
                approvedVal = false;
            }
            const id_student = String(element.id_estudiante)
            fails[id_student] = element.fallas
            const finalGrade = new Finalgrade({
                group_id: element.id_lista_clase,
                student_id: element.id_estudiante,
                final_grade:finalVal,
                approved:approvedVal
            });
            await finalGrade.save();
        }
    }
    let course_id = req.body[1]
    course_id = course_id.id_lista_clase
    const listCourse = await Finalgrade.find({group_id:course_id})
    statsCreate (listCourse, fails)
    res.send('Done')
}