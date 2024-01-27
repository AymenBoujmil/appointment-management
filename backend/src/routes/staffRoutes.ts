import express = require("express");
import {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController";

const router = express.Router();

router.get("/", getAllStaff);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);
export default router;
