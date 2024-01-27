import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
} from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";

import { Calendar, dateFnsLocalizer, type Event } from "react-big-calendar";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

import "react-big-calendar/lib/css/react-big-calendar.css";

import api from "../apis/backendApi";
import AddAppointmentModal from "../components/AppointmentsCalendar/AddAppointmentModal";
import EventInfo from "../components/AppointmentsCalendar/EventInfo";
import EventInfoModal from "../components/AppointmentsCalendar/EventInfoModal";
import {
  AppointmentFormData,
  IEventInfo,
} from "../models/AppointmentModal/AppointmentForms";
import Client from "../models/backend/Client";
import Staff from "../models/backend/Staff";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const generateId = () =>
  (Math.floor(Math.random() * 10000) + 1).toString();

const initialAppointmentFormData: AppointmentFormData = {
  client: undefined,
  staffMember: undefined,
  allDay: false,
  start: new Date(),
  end: new Date(),
};

const EventCalendar = () => {
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(
    null
  );

  const [eventInfoModal, setEventInfoModal] = useState(false);

  const [events, setEvents] = useState<IEventInfo[]>([]);
  const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const [appointmentFormData, setAppointmentFormData] =
    useState<AppointmentFormData>(initialAppointmentFormData);

  const fetchStaffAndClients = async () => {
    try {
      const staffResponse = await api.get("/staff");
      setStaffMembers(staffResponse.data);

      const clientsResponse = await api.get("/client");
      setClients(clientsResponse.data);
    } catch (error) {
      console.error("Error fetching staff and clients:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get("/appointment");
      const events = response.data.map((appointment: any) => ({
        _id: appointment.id,
        description: `Appointment with ${appointment.client.name}`,
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime),
      }));
      console.log(events);
      setEvents(events);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchStaffAndClients();
    fetchData();
  }, []);

  const handleSelectSlot = (event: Event) => {
    setOpenAppointmentModal(true);
    setCurrentEvent(event);
  };

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event);
    setEventInfoModal(true);
  };

  const handleAppointmentModalClose = () => {
    setAppointmentFormData(initialAppointmentFormData);
    setOpenAppointmentModal(false);
  };

  const onAddAppointment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addHours = (date: Date | undefined, hours: number) => {
      return date ? date.setHours(date.getHours() + hours) : undefined;
    };

    const setMinToZero = (date: any) => {
      date.setSeconds(0);

      return date;
    };
    try {
      const response = await api.post("/appointment", {
        startTime: appointmentFormData.start,
        endTime: appointmentFormData.end,
        staffId: appointmentFormData.staffMember,
        clientId: appointmentFormData.client,
      });

      const createdAppointment = response.data;

      const data: IEventInfo = {
        ...appointmentFormData,
        _id: createdAppointment.id,
        description: `Appointment with ${createdAppointment.client.name}`,
        start: setMinToZero(appointmentFormData.start),
        end: appointmentFormData.allDay
          ? addHours(appointmentFormData.start, 12)
          : setMinToZero(appointmentFormData.end),
      };

      const newEvents = [...events, data];
      setEvents(newEvents);

      setAppointmentFormData(initialAppointmentFormData);
      handleAppointmentModalClose();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const onDeleteEvent = async () => {
    try {
      if (currentEvent) {
        await api.delete(`/appointment/${(currentEvent as IEventInfo)._id}`);
      }

      setEvents(() =>
        [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!)
      );
      setEventInfoModal(false);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <Box
      mt={2}
      mb={2}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardHeader
            title="Calendar"
            subheader="Create Appointments and manage them easily"
          />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonGroup
                size="large"
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => setOpenAppointmentModal(true)}
                  size="small"
                  variant="contained"
                >
                  Add event
                </Button>
              </ButtonGroup>
            </Box>
            <Divider style={{ margin: 10 }} />

            <AddAppointmentModal
              open={openAppointmentModal}
              handleClose={handleAppointmentModalClose}
              appointmentFormData={appointmentFormData}
              clients={clients}
              staffMembers={staffMembers}
              setAppointmentFormData={setAppointmentFormData}
              onAddAppointment={onAddAppointment}
            />
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent as IEventInfo}
            />

            <Calendar
              localizer={localizer}
              events={events}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor="start"
              components={{ event: EventInfo }}
              endAccessor="end"
              defaultView="week"
              style={{
                height: 900,
              }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EventCalendar;
