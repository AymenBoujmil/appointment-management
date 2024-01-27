// src/controllers/appointmentController.ts
import { Request, Response } from "express";
import { AppointmentEntity } from "../models/appointmentModel";
import { getDataSource } from "../database";
import { StaffEntity } from "../models/staffModel";
import { ClientEntity } from "../models/clientModel";

export const getAllAppointments = async (_req: Request, res: Response) => {
  const AppDataSource = await getDataSource();
  const appointmentRepository = AppDataSource.getRepository(AppointmentEntity);
  const appointments = await appointmentRepository.find({
    relations: ["staff", "client"],
  });
  res.json(appointments);
};

export const createAppointment = async (req: Request, res: Response) => {
  const { startTime, endTime, staffId, clientId } = req.body;
  const AppDataSource = await getDataSource();
  const appointmentRepository = AppDataSource.getRepository(AppointmentEntity);
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  const clientRepository = AppDataSource.getRepository(ClientEntity);

  try {
    const staff = await staffRepository.findOne({ where: { id: staffId } });
    const client = await clientRepository.findOne({ where: { id: clientId } });

    if (!staff || !client) {
      res.status(400).json({ error: "Invalid staffId or clientId" });
      return;
    }
    const newAppointment = appointmentRepository.create({
      startTime,
      endTime,
      staff: { id: staffId },
      client: { id: clientId },
    });

    await appointmentRepository.save(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
