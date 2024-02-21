import { createSlice } from "@reduxjs/toolkit";

let intialState = {
  isAuthenticated: false,
  email: "",
  name: "",
  user_type: "",
  token: "",
  bookingID: "",
};

const storageName = "hydarate-user-state";

const hydarateInitalState = () => {
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

const requiredInitialState = hydarateInitalState();

const userSlice = createSlice({
  name: "user",
  initialState: requiredInitialState,
  reducers: {
    authenticate: (state, { payload }) => {
      const userState = {
        isAuthenticated: payload.authenticated,
        email: payload.email,
        name: payload.name,
        token: payload.token,
        user_type: payload.userType,
      };
      Object.assign(state, userState);
      localStorage.setItem(storageName, JSON.stringify(state));
    },
    resetUserState: (state) => {
      Object.assign(state, intialState);
      localStorage.setItem(storageName, JSON.stringify(state));
    },
  },
});

export default userSlice.reducer;

export const { authenticate, resetUserState } = userSlice.actions;
