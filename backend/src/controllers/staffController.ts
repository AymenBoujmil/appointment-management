import { Request, Response } from "express";
import * as StaffService from "../services/staffService";

export const getAllStaff = async (_req: Request, res: Response) => {
  try {
    const staff = await StaffService.getAllStaffService();
    res.json(staff);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createStaff = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;

  try {
    const newStaff = await StaffService.createStaffService(firstName, lastName);
    res.status(201).json(newStaff);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStaff = async (req: Request, res: Response) => {
  const staffId = parseInt(req.params.id, 10);

  try {
    const result = await StaffService.deleteStaffService(staffId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  const staffId = parseInt(req.params.id, 10);
  const { firstName, lastName } = req.body;

  try {
    const updatedStaff = await StaffService.updateStaffService(
      staffId,
      firstName,
      lastName
    );
    res.status(200).json(updatedStaff);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
