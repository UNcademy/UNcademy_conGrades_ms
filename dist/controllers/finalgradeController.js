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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalgradeCreate = exports.finalgradeReaderByStudent = exports.finalgradeReaderByGroup = void 0;
const finalgrade_1 = __importDefault(require("../model/finalgrade"));
const stastController_1 = require("./stastController");
const finalgradeReaderByGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_group = req.params.id;
    const finalgrade = yield finalgrade_1.default.find({ group_id: id_group });
    res.send(finalgrade);
});
exports.finalgradeReaderByGroup = finalgradeReaderByGroup;
const finalgradeReaderByStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_group = req.params.groupId;
    const id_student = req.params.studentId;
    const finalgrade = yield finalgrade_1.default.find({ group_id: id_group, student_id: id_student });
    res.send(finalgrade);
});
exports.finalgradeReaderByStudent = finalgradeReaderByStudent;
const finalgradeCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fails = {};
    for (let i = 0; i < req.body.length; i++) {
        let element = req.body[i];
        if (yield finalgrade_1.default.findOne({ student_id: element.id_estudiante })) {
            const thisFinalGrade = yield finalgrade_1.default.findOne({ student_id: element.id_estudiante });
            let newVal = (element.porcentaje * element.valor_numerico) / 100;
            newVal = Number(thisFinalGrade === null || thisFinalGrade === void 0 ? void 0 : thisFinalGrade.final_grade) + Number(newVal);
            let approvedVal = true;
            if (newVal < 3 && (thisFinalGrade === null || thisFinalGrade === void 0 ? void 0 : thisFinalGrade.approved) != false) {
                approvedVal = false;
            }
            yield finalgrade_1.default.findOneAndUpdate({ student_id: element.id_estudiante }, { final_grade: newVal, approved: approvedVal });
        }
        else {
            const finalVal = (element.porcentaje * element.valor_numerico) / 100;
            let approvedVal = true;
            if (finalVal < 3 || element.fallas > 8) {
                approvedVal = false;
            }
            const id_student = String(element.id_estudiante);
            fails[id_student] = element.fallas;
            const finalGrade = new finalgrade_1.default({
                group_id: element.id_lista_clase,
                student_id: element.id_estudiante,
                final_grade: finalVal,
                approved: approvedVal
            });
            yield finalGrade.save();
        }
    }
    ;
    let course_id = req.body[1];
    course_id = course_id.id_lista_clase;
    const listCourse = yield finalgrade_1.default.find({ group_id: course_id });
    (0, stastController_1.statsCreate)(listCourse, fails);
    res.send('Done');
});
exports.finalgradeCreate = finalgradeCreate;
