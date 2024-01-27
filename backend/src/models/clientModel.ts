// src/entities/Client.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AppointmentEntity } from "./appointmentModel";

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.client)
  appointments: AppointmentEntity[];
}
