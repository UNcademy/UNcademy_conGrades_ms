import {Request, Response} from 'express';

//Required package
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require('path');

export const actGenerator = async(req:Request, res:Response) => {
    const html = fs.readFileSync(path.join(__dirname,'../template/template.html'), "utf8");
    const options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "15mm",
            contents: '<h4 style=" color: red;font-size:20px;font-weight:800;text-align:center;">Acta Final Curso</h4>'
        },
        footer: {
            height: "5mm",
            contents: '<p>Firmado electrónicamente</p>'
        }
    };
    const finalGrades = req.body;
    const fileName = "act"+ finalGrades.gradesList[0].group_id + ".pdf";
    const document = {
        html: html,
        data: {
            finalGrades: req.body,
        },
        path: "dist/docs/"+fileName,
    };
    pdf.create(document, options)
        .then((ans:any) => {
            console.log(ans);
            res.send(ans);
        })
        .catch((error: any) => {
            console.error(error);
        });
}

export const getAct = async (req:Request, res:Response) => {
    const pdf2base64 = require('pdf-to-base64');
    const fileName = "act" + req.params.actId + ".pdf";
    pdf2base64(path.join(__dirname,'../docs',fileName))
    .then(
        (response:string) => {
            res.send(response);
        }
    )
    .catch(
        (error:any) => {
            console.log(error);
            res.send(error)
        }
    )
}