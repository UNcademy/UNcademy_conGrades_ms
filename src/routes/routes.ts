import { Router } from "express";
import { finalgradeCreate, finalgradeReaderByGroup, finalgradeReaderByStudent } from "../controllers/finalgradeController";
import { statsReader} from "../controllers/stastController";
const router = Router();

router.post("/finalgrade/save", finalgradeCreate)
router.get("/stats/:id", statsReader)
router.get("/finalgrade/group/:id", finalgradeReaderByGroup)
router.get("/finalgrade/student/:groupId/:studentId", finalgradeReaderByStudent)

export default router;