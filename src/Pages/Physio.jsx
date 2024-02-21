import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  createBooking,
  getAllSlots,
  getBookingByID,
} from "../requests/dataRequest";
import { resetBackDrop, showBackDrop } from "../store/models/backDrop";
import ModalBox from "../components/ModalBox";
import { showMessage } from "../store/models/messageBar";
import Table from "../components/Table";
import { bookingHeaders } from "../utils/TableHeaders";

function Physio() {
  const dispatch = useDispatch();
  const { email, name } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [update, setUpdate] = useState(false);
  const [bookings, setBookings] = useState(null);
  const [headers, setHeaders] = useState(null);
  const handleDateSelect = async (newDate) => {
    const selectedDate = dayjs(newDate).format();
    setDate(selectedDate);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSlotSelect = async (slot) => {
    dispatch(showBackDrop());
    const { status, message } = await createBooking({
      email,
      name,
      date,
      slot,
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
      handleClose();
      setUpdate(!update);
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
  useEffect(() => {
    dispatch(showBackDrop());
    const getSlot = async () => {
      const { data, status } = await getAllSlots();
      if (status) {
        setSlots(data);
      }
      dispatch(resetBackDrop());
    };
    getSlot();
  }, []);

  useEffect(() => {
    dispatch(showBackDrop());
    const getBookingDetails = async () => {
      const { data, status } = await getBookingByID(email);
      if (status) {
        setBookings(data);
        setHeaders(
          bookingHeaders({
            type: "physio",
          })
        );
      }
      dispatch(resetBackDrop());
    };
    getBookingDetails();
  }, [update]);

  return (
    <Box m="20px">
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        gap={5}
        margin={"3rem 0"}
      >
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography>Choose a Date</Typography>
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(newValue) => handleDateSelect(newValue)}
            minDate={dayjs()}
          />
          {date && (
            <Button
              size="medium"
              onClick={() => setOpen(true)}
              variant="contained"
              color="info"
            >
              Add Slot
            </Button>
          )}
        </Box>
        <Box display={"flex"} gap={2} width={"100%"} flexDirection={"column"}>
          <Typography variant="h6">Your Booking Details</Typography>
          <Table
            data={bookings}
            headers={headers}
            handleGetRow={(row) => row._id}
            height="70vh"
          />
        </Box>
      </Box>
      <ModalBox handleClose={handleClose} open={open}>
        <Box
          display={"flex"}
          width={"100%"}
          height={"100%"}
          flexDirection={"column"}
          gap={1.5}
        >
          <Typography variant="h5"> Select Time Slot</Typography>
          {slots &&
            slots.map((slot, index) => {
              return (
                <Box
                  gap={1.2}
                  display={"flex"}
                  flexDirection={"column"}
                  key={index}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {slot._id}
                  </Typography>
                  <Box display={"block"} width={"100%"} gap={1}>
                    {slot.slots &&
                      slot.slots.map((time, key) => {
                        return (
                          <Chip
                            key={key}
                            variant="outlined"
                            label={time.slotTime}
                            sx={{
                              mt: ".5rem",
                              ml: ".3rem",
                            }}
                            onClick={() => {
                              handleSlotSelect(time);
                            }}
                          />
                        );
                      })}
                  </Box>
                </Box>
              );
            })}
        </Box>
      </ModalBox>
    </Box>
  );
}

export default Physio;
