import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  ChangeEvent,
} from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Checkbox,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AppointmentFormData } from "../models/AppointmentModal/AppointmentForms";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  appointmentFormData: AppointmentFormData;
  setAppointmentFormData: Dispatch<SetStateAction<AppointmentFormData>>;
  onAddAppointment: (e: MouseEvent<HTMLButtonElement>) => void;
}

const AddDatePickerEventModal = ({
  open,
  handleClose,
  appointmentFormData,
  setAppointmentFormData,
  onAddAppointment,
}: IProps) => {
  const { description, start, end, allDay } = appointmentFormData;

  const onClose = () => {
    handleClose();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAppointmentFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAppointmentFormData((prevState) => ({
      ...prevState,
      allDay: event.target.checked,
    }));
  };

  const isDisabled = () => {
    const checkend = () => {
      if (!allDay && end === null) {
        return true;
      }
    };
    if (description === "" || start === null || checkend()) {
      return true;
    }
    return false;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Appointment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add an appointment, please fill in the information below.
        </DialogContentText>
        <Box component="form">
          <TextField
            name="description"
            value={description}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mb={2} mt={5}>
              <DateTimePicker
                label="Start date"
                value={start}
                ampm={true}
                minutesStep={30}
                onChange={(newValue) =>
                  setAppointmentFormData((prevState) => ({
                    ...prevState,
                    start: new Date(newValue!),
                  }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text" component={"span"}>
                All day?
              </Typography>
              <Checkbox onChange={handleCheckboxChange} value={allDay} />
            </Box>

            <DateTimePicker
              label="End date"
              disabled={allDay}
              minDate={start}
              minutesStep={30}
              ampm={true}
              value={allDay ? null : end}
              onChange={(newValue) =>
                setAppointmentFormData((prevState) => ({
                  ...prevState,
                  end: new Date(newValue!),
                }))
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isDisabled()}
          color="success"
          onClick={onAddAppointment}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDatePickerEventModal;
