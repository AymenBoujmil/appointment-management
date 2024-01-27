// src/routes/appointmentRoutes.ts
import express = require("express");
import {
  getAllAppointments,
  createAppointment,
} from "../controllers/appointmentController";

const router = express.Router();

// Define routes for Appointment entity
router.get("/", getAllAppointments);
router.post("/", createAppointment);

export default router;
