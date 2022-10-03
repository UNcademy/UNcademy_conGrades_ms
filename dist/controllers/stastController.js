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
exports.statsCreate = exports.statsReader = void 0;
const stats_1 = __importDefault(require("../model/stats"));
const statsReader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_group = req.params.id;
    const stats = yield stats_1.default.find({ group_id: id_group });
    res.send(stats);
});
exports.statsReader = statsReader;
const statsCreate = (listCourse, fails) => __awaiter(void 0, void 0, void 0, function* () {
    let part_per = 0;
    let approv_per = 0;
    let aver_grade = 0;
    let stand_dev = 0;
    let best_grade = 0;
    let worst_grade = 5;
    for (let i = 0; i < listCourse.length; i++) {
        let element = listCourse[i];
        let student = String(element.student_id);
        const elem_part = (fails[student] * 100) / 32;
        part_per = part_per + elem_part;
        if (element.approved == true) {
            approv_per = approv_per + 1;
        }
        aver_grade = Number(aver_grade) + Number(element.final_grade);
        if (element.final_grade > best_grade) {
            best_grade = element.final_grade;
        }
        if (element.final_grade < worst_grade) {
            worst_grade = element.final_grade;
        }
    }
    const id_group = listCourse[1].group_id;
    part_per = part_per / listCourse.length;
    approv_per = (approv_per / listCourse.length) * 100;
    aver_grade = Number(aver_grade) / listCourse.length;
    for (let i = 0; i < listCourse.length; i++) {
        let element = listCourse[i];
        stand_dev = (Number(element.final_grade) - Number(aver_grade)) ** 2;
    }
    stand_dev = Number(stand_dev) / Number(listCourse.length);
    stand_dev = Math.pow(stand_dev, 1 / 2);
    const stats = new stats_1.default({
        group_id: id_group,
        participation_percentage: part_per,
        aprobation_percentage: approv_per,
        average_grade: aver_grade,
        standart_deviation: stand_dev,
        best_grade: best_grade,
        worst_grade: worst_grade
    });
    yield stats.save();
});
exports.statsCreate = statsCreate;
