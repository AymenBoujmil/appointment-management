import { useState, MouseEvent, useEffect } from "react";
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

import { Calendar, type Event, dateFnsLocalizer } from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";

import EventInfo from "../components/EventInfo";
import EventInfoModal from "../components/EventInfoModal";
import AddDatePickerEventModal from "../components/AddAppointmentModal";
import {
  AppointmentFormData,
  IEventInfo,
} from "../models/AppointmentModal/AppointmentForms";
import api from "../apis/backendApi";

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
  description: "",
  allDay: false,
  start: undefined,
  end: undefined,
};

const EventCalendar = () => {
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(
    null
  );

  const [eventInfoModal, setEventInfoModal] = useState(false);

  const [events, setEvents] = useState<IEventInfo[]>([]);

  const [appointmentFormData, setAppointmentFormData] =
    useState<AppointmentFormData>(initialAppointmentFormData);

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

  const onAddAppointment = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addHours = (date: Date | undefined, hours: number) => {
      return date ? date.setHours(date.getHours() + hours) : undefined;
    };

    const setMinToZero = (date: any) => {
      date.setSeconds(0);

      return date;
    };

    const data: IEventInfo = {
      ...appointmentFormData,
      _id: generateId(),
      start: setMinToZero(appointmentFormData.start),
      end: appointmentFormData.allDay
        ? addHours(appointmentFormData.start, 12)
        : setMinToZero(appointmentFormData.end),
    };

    const newEvents = [...events, data];

    setEvents(newEvents);
    setAppointmentFormData(initialAppointmentFormData);
  };

  const onDeleteEvent = () => {
    setEvents(() =>
      [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!)
    );
    setEventInfoModal(false);
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
            subheader="Create Events and Todos and manage them easily"
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

            <AddDatePickerEventModal
              open={openAppointmentModal}
              handleClose={handleAppointmentModalClose}
              appointmentFormData={appointmentFormData}
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
