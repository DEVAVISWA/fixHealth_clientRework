import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBookingByID, getPhysioList } from "../requests/dataRequest";
import { resetBackDrop, showBackDrop } from "../store/models/backDrop";
import { showMessage } from "../store/models/messageBar";
import Table from "../components/Table";
import { bookingHeaders } from "../utils/TableHeaders";
import { resetBookingState } from "../store/models/booking";

function Sales() {
  const dispatch = useDispatch();
  const [physio, setPhysio] = useState("");
  const [physios, setPhysios] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [headers, setHeaders] = useState(null);

  const handleSelectPhysio = async (event) => {
    setPhysio(event.target.value);
    dispatch(showBackDrop());
    const { data, status } = await getBookingByID(event.target.value);
    if (status) {
      setBookings(data);
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
    const getPhysiosDetails = async () => {
      const { data, status } = await getPhysioList();
      if (status) {
        setPhysios(data);
        setHeaders(
          bookingHeaders({
            type: "sales",
          })
        );
      }
      dispatch(resetBackDrop());
    };
    dispatch(resetBookingState());
    getPhysiosDetails();
  }, []);

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
          <Typography>Choose a Physio</Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="physio-select-label">Physio</InputLabel>
              <Select
                labelId="physio-select-label"
                id="physio-select-label"
                value={physio}
                label="Physio"
                onChange={handleSelectPhysio}
              >
                {physios &&
                  physios.map((doc, key) => {
                    return (
                      <MenuItem key={key} value={doc.email}>
                        {doc.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box display={"flex"} gap={2} width={"100%"} flexDirection={"column"}>
          <Typography variant="h6">Booking Details</Typography>
          {bookings && (
            <Table
              data={bookings}
              headers={headers}
              handleGetRow={(row) => row._id}
              height="70vh"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Sales;
