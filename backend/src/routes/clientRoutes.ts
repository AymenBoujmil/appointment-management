import express = require("express");
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController";

const router = express.Router();

router.get("/", getAllClients);
router.post("/", createClient);
router.put("/client/:id", updateClient);
router.delete("/client/:id", deleteClient);

export default router;
