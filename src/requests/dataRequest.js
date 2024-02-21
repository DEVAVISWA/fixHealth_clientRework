import axios from "../config/axiosConfig";

export const getAllSlots = async () => {
  return new Promise((resolve) => {
    axios.get("/slots/get_slots").then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          message: res.data.message,
          data: null,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const getPhysioList = async () => {
  return new Promise((resolve) => {
    axios.get("/user/get_physio_list").then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          message: res.data.message,
          data: null,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const getBookingByID = async (email) => {
  return new Promise((resolve) => {
    axios.get("/booking/get_booking_details_by_id/" + email).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          message: res.data.message,
          data: null,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const getBookingByDetail = async (bookingID) => {
  return new Promise((resolve) => {
    axios.get("/booking/get_booking_detail/" + bookingID).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          message: res.data.message,
          data: null,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const createBooking = async ({ email, name, date, slot }) => {
  return new Promise((resolve) => {
    const data = {
      email,
      name,
      date,
      slot: slot.id,
      slotNo: slot.slotNo,
    };
    axios.post("/booking/create_booking", data).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          data: null,
          message: res.data.message,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: null,
        });
      }
    });
  });
};
export const createPatientBooking = async ({ email, id }) => {
  return new Promise((resolve) => {
    const data = {
      email,
      availableSlotID: id,
    };
    axios.post("/slots/create_patient_booking", data).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          data: null,
          message: res.data.message,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: null,
        });
      }
    });
  });
};
export const getPatientBooking = async ({ email }) => {
  return new Promise((resolve) => {
    const data = {
      email,
    };
    axios.post("/slots/get_patient_booking", data).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          data: null,
          message: res.data.message,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const getAllPatientDetails = async ({ date, slotNo }) => {
  return new Promise((resolve) => {
    const data = {
      date,
      slotNo,
    };
    axios.post("/slots/get_all_patients", data).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          data: null,
          message: res.data.message,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};
export const getAvailableSlots = async (date) => {
  return new Promise((resolve) => {
    const data = {
      date,
    };
    console.log(date);
    axios.post("/slots/get_available_slots", data).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          data: res.data.data,
          message: res.data.data,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: res.data.data,
        });
      }
    });
  });
};

export const confirmSlot = async ({
  bookingID,
  remarks,
  availableSlotID,
  email,
}) => {
  return new Promise((resolve) => {
    const data = {
      bookingID,
      remarks,
      email,
      availableSlotID,
    };
    axios.post("/booking/confirm_patient_booking", data).then((res) => {
      if (res.data.error) {
        return resolve({
          status: false,
          data: null,
          message: res.data.message,
        });
      } else {
        return resolve({
          status: true,
          message: res.data.message,
          data: null,
        });
      }
    });
  });
};
