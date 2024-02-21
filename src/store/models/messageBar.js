import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  message: "",
  duration: 3000,
  type: "success",
};

const messageBarSlice = createSlice({
  name: "messagebar",
  initialState,
  reducers: {
    showMessage: (state, { payload }) => {
      const newState = {
        active: true,
        message: payload.message ?? "",
        duration: payload.duration ?? 3000,
        type: payload.type ?? "success",
      };
      Object.assign(state, newState);
    },
    resetMessage: (state) => {
      Object.assign(state, initialState);
    },
    closeMessage: (state) => {
      const newState = {
        ...state,
        active: false,
      };
      Object.assign(state, newState);
    },
  },
});

export default messageBarSlice.reducer;

export const { showMessage, resetMessage, closeMessage } =
  messageBarSlice.actions;
