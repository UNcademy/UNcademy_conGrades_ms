import { Router } from "express";
import {
    finalGradeCreate,
    finalGradeReaderByGroup,
    finalGradeReaderByGroupAndStudent,
    finalGradeReaderByStudent
} from "../controllers/finalgradeController";
import { statsReader} from "../controllers/stastController";
const router = Router();

router.post("/finalgrade/save", finalGradeCreate)
router.get("/stats/:id", statsReader)
router.get("/finalgrade/group/:id", finalGradeReaderByGroup)
router.get("/finalgrade/student/:groupId/:studentName", finalGradeReaderByGroupAndStudent)
router.get("/finalgrade/student/:studentName", finalGradeReaderByStudent)

export default router;