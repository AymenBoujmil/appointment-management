import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AppointmentEntity } from "./appointmentModel";

@Entity()
export class StaffEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.client)
  appointments: AppointmentEntity[];
}
