"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finalgradeController_1 = require("../controllers/finalgradeController");
const stastController_1 = require("../controllers/stastController");
const actController_1 = require("../controllers/actController");
const router = (0, express_1.Router)();
router.post("/finalgrade/save", finalgradeController_1.finalGradeCreate);
router.get("/stats/:id", stastController_1.statsReader);
router.get("/finalgrade/group/:id", finalgradeController_1.finalGradeReaderByGroup);
router.get("/finalgrade/student/:groupId/:studentName", finalgradeController_1.finalGradeReaderByGroupAndStudent);
router.get("/finalgrade/student/:studentName", finalgradeController_1.finalGradeReaderByStudent);
router.post("/act", actController_1.actGenerator);
router.get("/act/:actId", actController_1.getAct);
exports.default = router;
