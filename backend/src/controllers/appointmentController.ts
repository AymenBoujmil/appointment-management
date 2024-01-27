import { Request, Response } from "express";
import * as AppointmentService from "../services/appointmentService";

export const getAllAppointments = async (_req: Request, res: Response) => {
  try {
    const appointments = await AppointmentService.getAllAppointmentsService();
    res.json(appointments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  const { startTime, endTime, staffId, clientId } = req.body;

  try {
    const newAppointment = await AppointmentService.createAppointmentService(
      startTime,
      endTime,
      staffId,
      clientId
    );
    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.id, 10);

  try {
    const result = await AppointmentService.deleteAppointmentService(
      appointmentId
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.id, 10);
  const { startTime, endTime, staffId, clientId } = req.body;

  try {
    const updatedAppointment =
      await AppointmentService.updateAppointmentService(
        appointmentId,
        startTime,
        endTime,
        staffId,
        clientId
      );
    res.status(200).json(updatedAppointment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
