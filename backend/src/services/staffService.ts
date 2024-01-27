import { getDataSource } from "../database";
import { StaffEntity } from "../models/staffModel";

export const getAllStaffService = async () => {
  const AppDataSource = await getDataSource();
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  return await staffRepository.find();
};

export const createStaffService = async (
  firstName: string,
  lastName: string
) => {
  const AppDataSource = await getDataSource();
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  try {
    if (!firstName || !lastName) {
      throw new Error("Both firstName and lastName are required");
    }

    const newStaff = staffRepository.create({ firstName, lastName });
    await staffRepository.save(newStaff);
    return newStaff;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const deleteStaffService = async (staffId: number) => {
  const AppDataSource = await getDataSource();
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  try {
    const staff = await staffRepository.findOne({ where: { id: staffId } });

    if (!staff) {
      throw new Error("Staff member not found");
    }

    await staffRepository.remove(staff);
    return { message: "Staff member deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const updateStaffService = async (
  staffId: number,
  firstName?: string,
  lastName?: string
) => {
  const AppDataSource = await getDataSource();
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  try {
    const staff = await staffRepository.findOne({ where: { id: staffId } });

    if (!staff) {
      throw new Error("Staff member not found");
    }

    if (firstName) staff.firstName = firstName;
    if (lastName) staff.lastName = lastName;

    await staffRepository.save(staff);
    return staff;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};
