import { Request, Response } from "express";
import * as ClientService from "../services/clientService";

export const getAllClients = async (_req: Request, res: Response) => {
  try {
    const clients = await ClientService.getAllClientsService();
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newClient = await ClientService.createClientService(name);
    res.status(201).json(newClient);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const clientId = parseInt(req.params.id, 10);

  try {
    const result = await ClientService.deleteClientService(clientId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const clientId = parseInt(req.params.id, 10);
  const { name } = req.body;

  try {
    const updatedClient = await ClientService.updateClientService(
      clientId,
      name
    );
    res.status(200).json(updatedClient);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
