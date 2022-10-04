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
exports.finalGradeCreate = exports.finalGradeReaderByStudent = exports.finalGradeReaderByGroupAndStudent = exports.finalGradeReaderByGroup = void 0;
const finalgrade_1 = __importDefault(require("../model/finalgrade"));
const stastController_1 = require("./stastController");
const finalGradeReaderByGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_group = req.params.id;
    const finalGrade = yield finalgrade_1.default.find({ group_id: id_group });
    res.send(finalGrade);
});
exports.finalGradeReaderByGroup = finalGradeReaderByGroup;
const finalGradeReaderByGroupAndStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_group = req.params.groupId;
    const name_student = req.params.studentName;
    const finalGrade = yield finalgrade_1.default.find({ group_id: id_group, student_name: name_student });
    res.send(finalGrade);
});
exports.finalGradeReaderByGroupAndStudent = finalGradeReaderByGroupAndStudent;
const finalGradeReaderByStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name_student = req.params.studentName;
    const finalGrade = yield finalgrade_1.default.find({ student_name: name_student });
    res.send(finalGrade);
});
exports.finalGradeReaderByStudent = finalGradeReaderByStudent;
const finalGradeCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fails = {};
    for (let i = 0; i < req.body.length; i++) {
        let element = req.body[i];
        let thisGrade = +element.grade;
        let approvedVal = true;
        let reason = null;
        if ((yield finalgrade_1.default.findOne({ student_name: element.studentName })) && !Number.isNaN(thisGrade)) {
            const thisFinalGrade = yield finalgrade_1.default.findOne({ student_name: element.studentName });
            let newVal = (element.weight * element.grade) / 100;
            newVal = Number(thisFinalGrade === null || thisFinalGrade === void 0 ? void 0 : thisFinalGrade.final_grade) + Number(newVal);
            if (newVal < 30) {
                approvedVal = false;
                if (element.absences > 8) {
                    reason = "Absences and Grades";
                }
                else {
                    reason = "Grades";
                }
            }
            else if (element.absences < 8) {
                approvedVal = true;
                reason = null;
            }
            yield finalgrade_1.default.findOneAndUpdate({ student_name: element.studentName }, { final_grade: newVal, approved: approvedVal, reason: reason });
        }
        else {
            let finalVal;
            if (Number.isNaN(thisGrade)) {
                finalVal = element.grade;
                if (element.grade == "Reprobada") {
                    approvedVal = false;
                    reason = "Grades";
                }
            }
            else {
                finalVal = (element.weight * element.grade) / 100;
                if (finalVal < (element.weight * 30) / 100) {
                    approvedVal = false;
                    reason = "Grades";
                }
            }
            if (element.absences > 8) {
                approvedVal = false;
                if (reason == null) {
                    reason = "Absences";
                }
                else {
                    reason = "Absences and Grades";
                }
            }
            const name_student = String(element.studentName);
            fails[name_student] = element.absences;
            const finalGrade = new finalgrade_1.default({
                group_id: element.courseGroup,
                student_name: element.studentName,
                final_grade: finalVal,
                absences: element.absences,
                approved: approvedVal,
                reason: reason
            });
            yield finalGrade.save();
        }
    }
    let course_id = req.body[1];
    course_id = course_id.courseGroup;
    const listCourse = yield finalgrade_1.default.find({ group_id: course_id });
    yield (0, stastController_1.statsCreate)(listCourse, fails);
    res.send('Done');
});
exports.finalGradeCreate = finalGradeCreate;
