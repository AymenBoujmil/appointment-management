import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import { AppointmentFormData } from "../../models/AppointmentModal/AppointmentForms";
import Client from "../../models/backend/Client";
import Staff from "../../models/backend/Staff";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  appointmentFormData: AppointmentFormData;
  setAppointmentFormData: Dispatch<SetStateAction<AppointmentFormData>>;
  onAddAppointment: (e: MouseEvent<HTMLButtonElement>) => void;
  clients: Client[];
  staffMembers: Staff[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const AddAppointmentModal = ({
  open,
  handleClose,
  appointmentFormData,
  setAppointmentFormData,
  onAddAppointment,
  clients,
  staffMembers,
}: IProps) => {
  const { client, staffMember, start, end, allDay } = appointmentFormData;

  const onClose = () => {
    handleClose();
  };

  const handleChangeClient = (event: SelectChangeEvent<number>) => {
    const clientIdString: string | number = event.target.value;

    const clientId: number = +clientIdString;
    setAppointmentFormData((prevState) => ({
      ...prevState,
      client: clientId,
    }));
  };

  const handleChangeStaffMember = (event: SelectChangeEvent<number>) => {
    const staffMemberIdString: string | number = event.target.value;

    const staffMemberId: number = +staffMemberIdString;
    setAppointmentFormData((prevState) => ({
      ...prevState,
      staffMember: staffMemberId,
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
    if (
      start === null ||
      checkend() ||
      staffMember === undefined ||
      client === undefined
    ) {
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
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-single-client-label">Client</InputLabel>
                <Select
                  labelId="demo-single-client-label"
                  id="demo-single-client"
                  value={client}
                  onChange={handleChangeClient}
                  input={<OutlinedInput label="Client" />}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                        width: 250,
                      },
                    },
                  }}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-single-staff-label">Staff</InputLabel>
                <Select
                  labelId="demo-single-staff-label"
                  id="demo-single-staff"
                  value={staffMember}
                  onChange={handleChangeStaffMember}
                  input={<OutlinedInput label="Staff" />}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                        width: 250,
                      },
                    },
                  }}
                >
                  {staffMembers.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id}>
                      {staff.firstName} {staff.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box mb={2} mt={3}>
                  <DateTimePicker
                    label="Start date"
                    value={start}
                    ampm={true}
                    minutesStep={5}
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
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box mb={2} mt={3}>
                  <DateTimePicker
                    label="End date"
                    disabled={allDay}
                    minDate={start}
                    minutesStep={5}
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
                </Box>
              </LocalizationProvider>
            </Grid>
          </Grid>
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

export default AddAppointmentModal;
