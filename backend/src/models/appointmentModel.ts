// src/entities/Appointment.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { StaffEntity } from "./staffModel";
import { ClientEntity } from "./clientModel";

@Entity()
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => StaffEntity, (staff) => staff.appointments)
  staff: StaffEntity;

  @ManyToOne(() => ClientEntity, (client) => client.appointments)
  client: ClientEntity;
}
