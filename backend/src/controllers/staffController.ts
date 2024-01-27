// src/controllers/staffController.ts
import { Request, Response } from "express";
import { getDataSource } from "../database";
import { StaffEntity } from "../models/staffModel";

export const getAllStaff = async (_req: Request, res: Response) => {
  const AppDataSource = await getDataSource();
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  const staff = await staffRepository.find();
  res.json(staff);
};

export const createStaff = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;
  const AppDataSource = await getDataSource();
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  try {
    // Validate input data
    if (!firstName || !lastName) {
      res
        .status(400)
        .json({ error: "Both firstName and lastName are required" });
      return;
    }

    const newStaff = staffRepository.create({ firstName, lastName });
    await staffRepository.save(newStaff);
    res.status(201).json(newStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
