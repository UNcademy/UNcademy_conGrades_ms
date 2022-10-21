"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actGenerator = void 0;
//Required package
const pdf = require("pdf-creator-node");
const fs = require("fs");
const actGenerator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const html = fs.readFileSync("../template.html", "utf8");
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
    const fileName = "act" + req.body.gradeList[0].groupId + ".pdf";
    const document = {
        html: html,
        data: {
            finalGrades: req.body,
        },
        path: "./docs/" + fileName,
    };
    pdf.create(document, options)
        .then((res) => {
        console.log(res);
    })
        .catch((error) => {
        console.error(error);
    });
    const filepath = 'http://localhost:3000/docs/' + fileName;
    res.render('download', {
        path: filepath
    });
});
exports.actGenerator = actGenerator;
