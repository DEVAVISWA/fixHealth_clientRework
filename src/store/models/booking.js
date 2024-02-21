import { createSlice } from "@reduxjs/toolkit";

let intialState = {
  bookingID: "",
  slotID: "",
  date: "",
};

const storageName = "hydrate-booking-state";

const hydrateInitalState = () => {
  const rawUserState = localStorage.getItem(storageName);
  const savedUserState = JSON.parse(rawUserState);
  if (
    savedUserState &&
    Object.keys(savedUserState).length === Object.keys(intialState).length
  ) {
    return savedUserState;
  }
  return intialState;
};

const requiredInitialState = hydrateInitalState();

const bookingSlice = createSlice({
  name: "booking",
  initialState: requiredInitialState,
  reducers: {
    addBooking: (state, { payload }) => {
      const userState = {
        bookingID: payload.bookingID,
        date: payload.date,
        slotID: payload.slotID,
      };
      Object.assign(state, userState);
      localStorage.setItem(storageName, JSON.stringify(state));
    },
    resetBookingState: (state) => {
      Object.assign(state, intialState);
      localStorage.setItem(storageName, JSON.stringify(state));
    },
  },
});

export default bookingSlice.reducer;

export const { addBooking, resetBookingState } = bookingSlice.actions;
