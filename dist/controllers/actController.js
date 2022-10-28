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
exports.getAct = exports.actGenerator = void 0;
//Required package
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require('path');
const actGenerator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const html = fs.readFileSync(path.join(__dirname, '../template/template.html'), "utf8");
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
    const fileName = "act" + finalGrades.gradesList[0].group_id + ".pdf";
    const document = {
        html: html,
        data: {
            finalGrades: req.body,
        },
        path: "dist/docs/" + fileName,
    };
    pdf.create(document, options)
        .then((ans) => {
        console.log(ans);
        res.send(ans);
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.actGenerator = actGenerator;
const getAct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pdf2base64 = require('pdf-to-base64');
    const fileName = "act" + req.params.actId + ".pdf";
    pdf2base64(path.join(__dirname, '../docs', fileName))
        .then((response) => {
        res.send(response);
    })
        .catch((error) => {
        console.log(error);
        res.send(error);
    });
});
exports.getAct = getAct;
