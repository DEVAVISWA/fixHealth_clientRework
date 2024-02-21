import React, { useEffect, useState } from "react";
import {
  confirmSlot,
  getAllPatientDetails,
  getBookingByDetail,
} from "../requests/dataRequest";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetBackDrop, showBackDrop } from "../store/models/backDrop";
import { showMessage } from "../store/models/messageBar";
import ROUTES from "../config/routes";

const Confirmation = () => {
  const { bookingID, slotID, date } = useSelector((state) => state.booking);
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState("");
  const [patients, setPatients] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [availableSlotID, setAvailableSlotID] = useState("");
  useEffect(() => {
    dispatch(showBackDrop());
    const getBookingDetails = async () => {
      const { data, status } = await getAllPatientDetails({
        slotNo: slotID.slotNo,
        date,
      });
      if (status) {
        setPatients(data[0].patients);
        setAvailableSlotID(data[0]._id);
      }
      dispatch(resetBackDrop());
    };
    getBookingDetails();
  }, []);
  const handleSelectPatient = (e) => {
    setSelectedPatient(e.target.value);
  };
  const handleSubmit = async () => {
    dispatch(showBackDrop());
    const { message, status } = await confirmSlot({
      bookingID,
      remarks,
      email,
      availableSlotID,
    });
    if (status) {
      dispatch(
        showMessage({
          message: message ?? "Successfully Created",
          type: "success",
          duration: 3000,
          active: true,
        })
      );
      navigate(ROUTES.sales);
    } else {
      dispatch(
        showMessage({
          message: message ?? "Something went wrong, please try again!",
          type: "error",
          duration: 3000,
          active: true,
        })
      );
    }
    dispatch(resetBackDrop());
  };

  return (
    <Box m={"20px"}>
      {patients && patients.length > 0 ? (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
          width={"100%"}
          // height={"80vh"}
          gap={3}
        >
          <Typography variant="h6">Slot Confirmation</Typography>
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Typography>Choose a Patient</Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="patient-select-label">Physio</InputLabel>
                <Select
                  labelId="patient-select-label"
                  id="patient-select-label"
                  value={selectedPatient}
                  label="Patient"
                  onChange={handleSelectPatient}
                >
                  {patients &&
                    patients.map((patient, key) => {
                      return (
                        <MenuItem key={key} value={patient.email}>
                          {patient.email}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <TextField
            value={remarks}
            rows={4}
            multiline
            sx={{
              width: {
                sx: "100%",
                xs: "60%",
              },
            }}
            label={"Add Remarks"}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmit()}
          >
            Confirm Slot
          </Button>
        </Box>
      ) : (
        <Typography>No Patient to Book</Typography>
      )}
    </Box>
  );
};

export default Confirmation;
