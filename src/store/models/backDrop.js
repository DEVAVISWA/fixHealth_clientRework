import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

const backDropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    showBackDrop: (state) => {
      const newState = {
        active: true,
      };
      Object.assign(state, newState);
    },
    resetBackDrop: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export default backDropSlice.reducer;

export const { resetBackDrop, showBackDrop } = backDropSlice.actions;
