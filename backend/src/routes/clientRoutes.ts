// src/routes/clientRoutes.ts
import express = require("express");
import { getAllClients, createClient } from "../controllers/clientController";

const router = express.Router();

// Define routes for Client entity
router.get("/", getAllClients);
router.post("/", createClient);

export default router;
