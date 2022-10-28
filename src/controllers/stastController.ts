import {Request, Response} from 'express';
import Stats from '../model/stats';


export const statsReader = async (req:Request, res:Response) => {
    const id_group = req.params.id
    const stats = await Stats.find({group_id:id_group})
    res.send(stats)
}

export const statsCreate = async (listCourse: any, fails: any) => {
    let part_per: number = 0
    let approved_per: number = 0
    let aver_grade: any = 0
    let stand_dev: any = 0
    let best_grade:any = 0
    let worst_grade: any = 50
    for (let i=0;i < listCourse.length;i++){
        let element = listCourse[i]
        let student = String(element.student_name)
        const elem_part:number = 100 - (fails[student]*100)/32
        part_per = part_per + elem_part
        if (element.approved == true){
            approved_per = approved_per+1
        }
        let finalGrade:number = +element.final_grade
        if (!Number.isNaN(finalGrade)){
            aver_grade = Number(aver_grade) + Number(element.final_grade)
            if (element.final_grade > best_grade){
                best_grade = element.final_grade
            }
            if (element.final_grade < worst_grade){
                worst_grade = element.final_grade
            }
        }
        else{
            aver_grade = null
            best_grade = null
            worst_grade = null
            stand_dev = null
        }

    }
    const id_group:number = listCourse[0].group_id
    part_per = part_per/listCourse.length
    approved_per = ((approved_per/listCourse.length)*100)
    const finalGrade:number = +listCourse[1].final_grade
    if (!Number.isNaN(finalGrade)){
        aver_grade = Number(aver_grade)/listCourse.length
        for (let i=0;i < listCourse.length;i++){
            let element = listCourse[i]
            stand_dev = (Number(element.final_grade) - Number(aver_grade))**2
        }
        stand_dev = Number(stand_dev)/Number(listCourse.length)
        stand_dev = Math.pow(stand_dev,1/2)
    }
    const stats = new Stats({
        group_id:id_group,
        participation_percentage:part_per,
        approbation_percentage:approved_per,
        average_grade:aver_grade,
        standard_deviation:stand_dev,
        best_grade:best_grade,
        worst_grade:worst_grade
    })
    await stats.save();
}