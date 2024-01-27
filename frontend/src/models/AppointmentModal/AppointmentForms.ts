import { type Event } from "react-big-calendar";

export interface IEventInfo extends Event {
  _id: string;
  description: string;
}

export interface AppointmentFormData {
  description: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
}
