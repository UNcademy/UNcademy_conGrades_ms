import { Router } from "express";
import {
    finalGradeCreate,
    finalGradeReaderByGroup,
    finalGradeReaderByGroupAndStudent,
    finalGradeReaderByStudent
} from "../controllers/finalgradeController";
import { statsReader} from "../controllers/stastController";
import {actGenerator, getAct} from "../controllers/actController";

const router = Router();

router.post("/finalgrade/save", finalGradeCreate)
router.get("/stats/:id", statsReader)
router.get("/finalgrade/group/:id", finalGradeReaderByGroup)
router.get("/finalgrade/student/:groupId/:studentName", finalGradeReaderByGroupAndStudent)
router.get("/finalgrade/student/:studentName", finalGradeReaderByStudent)
router.post("/act",actGenerator)
router.get("/act/:actId", getAct)

export default router;