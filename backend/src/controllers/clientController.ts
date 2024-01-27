// src/controllers/clientController.ts
import { Request, Response } from "express";
import { getDataSource } from "../database";
import { ClientEntity } from "../models/clientModel";

export const getAllClients = async (_req: Request, res: Response) => {
  const AppDataSource = await getDataSource();
  const clientRepository = AppDataSource.getRepository(ClientEntity);
  const clients = await clientRepository.find();
  res.json(clients);
};

export const createClient = async (req: Request, res: Response) => {
  const { name } = req.body;
  const AppDataSource = await getDataSource();
  const clientRepository = AppDataSource.getRepository(ClientEntity);
  try {
    const newClient = clientRepository.create({ name });
    await clientRepository.save(newClient);
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
