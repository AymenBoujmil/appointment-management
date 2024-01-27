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

export const deleteClient = async (req: Request, res: Response) => {
  const clientId = parseInt(req.params.id, 10);
  const AppDataSource = await getDataSource();
  const clientRepository = AppDataSource.getRepository(ClientEntity);

  try {
    const client = await clientRepository.findOne({ where: { id: clientId } });

    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    await clientRepository.remove(client);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const clientId = parseInt(req.params.id, 10);
  const { name } = req.body;
  const AppDataSource = await getDataSource();
  const clientRepository = AppDataSource.getRepository(ClientEntity);

  try {
    const client = await clientRepository.findOne({ where: { id: clientId } });

    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }

    if (name) client.name = name;

    await clientRepository.save(client);
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
