import express = require("express");
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController";

const router = express.Router();

router.get("/", getAllAppointments);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
