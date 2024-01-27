// src/routes/staffRoutes.ts
import express = require("express");
import { getAllStaff, createStaff } from "../controllers/staffController";

const router = express.Router();

// Define routes for Staff entity
router.get("/", getAllStaff);
router.post("/", createStaff);

export default router;
