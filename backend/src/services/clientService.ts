import { getDataSource } from "../database";
import { ClientEntity } from "../models/clientModel";

export const getAllClientsService = async () => {
  const AppDataSource = await getDataSource();
  const clientRepository = AppDataSource.getRepository(ClientEntity);
  return await clientRepository.find();
};

export const createClientService = async (name: string) => {
  const AppDataSource = await getDataSource();
  const clientRepository = AppDataSource.getRepository(ClientEntity);
  try {
    const newClient = clientRepository.create({ name });
    await clientRepository.save(newClient);
    return newClient;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const deleteClientService = async (clientId: number) => {
  const AppDataSource = await getDataSource();
  const clientRepository = AppDataSource.getRepository(ClientEntity);

  try {
    const client = await clientRepository.findOne({ where: { id: clientId } });

    if (!client) {
      throw new Error("Client not found");
    }

    await clientRepository.remove(client);
    return { message: "Client deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const updateClientService = async (clientId: number, name?: string) => {
  const AppDataSource = await getDataSource();
  const clientRepository = AppDataSource.getRepository(ClientEntity);

  try {
    const client = await clientRepository.findOne({ where: { id: clientId } });

    if (!client) {
      throw new Error("Client not found");
    }

    if (name) client.name = name;

    await clientRepository.save(client);
    return client;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};
