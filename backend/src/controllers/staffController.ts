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

export const deleteStaff = async (req: Request, res: Response) => {
  const staffId = parseInt(req.params.id, 10);
  const AppDataSource = await getDataSource();
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  try {
    const staff = await staffRepository.findOne({ where: { id: staffId } });

    if (!staff) {
      res.status(404).json({ error: "Staff member not found" });
      return;
    }

    await staffRepository.remove(staff);
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  const staffId = parseInt(req.params.id, 10);
  const { firstName, lastName } = req.body;
  const AppDataSource = await getDataSource();
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  try {
    const staff = await staffRepository.findOne({ where: { id: staffId } });

    if (!staff) {
      res.status(404).json({ error: "Staff member not found" });
      return;
    }

    if (firstName) staff.firstName = firstName;
    if (lastName) staff.lastName = lastName;

    await staffRepository.save(staff);
    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
