import { getDataSource } from "../database";
import { AppointmentEntity } from "../models/appointmentModel";
import { StaffEntity } from "../models/staffModel";
import { ClientEntity } from "../models/clientModel";

export const getAllAppointmentsService = async () => {
  const AppDataSource = await getDataSource();
  const appointmentRepository = AppDataSource.getRepository(AppointmentEntity);
  return await appointmentRepository.find({ relations: ["staff", "client"] });
};

export const createAppointmentService = async (
  startTime: string,
  endTime: string,
  staffId: number,
  clientId: number
) => {
  const AppDataSource = await getDataSource();
  const appointmentRepository = AppDataSource.getRepository(AppointmentEntity);
  const staffRepository = AppDataSource.getRepository(StaffEntity);
  const clientRepository = AppDataSource.getRepository(ClientEntity);

  try {
    const staff = await staffRepository.findOne({ where: { id: staffId } });
    const client = await clientRepository.findOne({ where: { id: clientId } });

    if (!staff || !client) {
      throw new Error("Invalid staffId or clientId");
    }

    const newAppointment = appointmentRepository.create({
      startTime,
      endTime,
      staff: { id: staffId },
      client: { id: clientId },
    });

    await appointmentRepository.save(newAppointment);
    return newAppointment;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const deleteAppointmentService = async (appointmentId: number) => {
  const AppDataSource = await getDataSource();
  const appointmentRepository = AppDataSource.getRepository(AppointmentEntity);

  try {
    const appointment = await appointmentRepository.findOne({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    await appointmentRepository.remove(appointment);
    return { message: "Appointment deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const updateAppointmentService = async (
  appointmentId: number,
  startTime: Date,
  endTime: Date,
  staffId?: number,
  clientId?: number
) => {
  const AppDataSource = await getDataSource();
  const appointmentRepository = AppDataSource.getRepository(AppointmentEntity);

  try {
    const appointment = await appointmentRepository.findOne({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    appointment.startTime = startTime || appointment.startTime;
    appointment.endTime = endTime || appointment.endTime;

    if (staffId) {
      const staffRepository = AppDataSource.getRepository(StaffEntity);
      const staff = await staffRepository.findOne({ where: { id: staffId } });

      if (!staff) {
        throw new Error("Invalid staffId");
      }

      appointment.staff = staff;
    }

    if (clientId) {
      const clientRepository = AppDataSource.getRepository(ClientEntity);
      const client = await clientRepository.findOne({
        where: { id: clientId },
      });

      if (!client) {
        throw new Error("Invalid clientId");
      }

      appointment.client = client;
    }

    await appointmentRepository.save(appointment);
    return appointment;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};
