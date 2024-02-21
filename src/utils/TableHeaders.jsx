import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { addBooking } from "../store/models/booking";

export const bookingHeaders = ({ type }) => {
  const headers = [
    {
      field: "date",
      headerName: "Slot Date",
      flex: 1,
      valueFormatter: (params) => dayjs(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "slotTime",
      headerName: "Slot Time",
      flex: 1,
      renderCell: (params) => (
        <CustomCellRenderer value={params.row.slot.slotTime} />
      ),
    },
    {
      field: "filter",
      headerName: "Slot Period",
      flex: 1,
      renderCell: (params) => (
        <CustomCellRenderer value={params.row.slot.filter} />
      ),
    },
  ];
  if (type === "physio" || type === "sales") {
    headers.splice(0, 0, {
      field: "slot_confirmed",
      headerName: "Slot Confirmed",
      flex: 1,
      renderCell: (params) => (
        <CustomCellRenderer value={params.value ? "Confirmed" : "Pending"} />
      ),
    });
    headers.splice(0, 0, {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
      renderCell: (params) => (
        <CustomCellRenderer
          value={params.value.length > 0 ? params.value : "No Remarks"}
        />
      ),
    });
    headers.splice(0, 0, {
      field: "name",
      headerName: "Physio Name",
      flex: 1,
    });
  }
  if (type === "sales") {
    headers.splice(0, 0, {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => <ActionButton value={params.row} />,
    });
  }
  return headers;
};
const ActionButton = ({ value }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addBooking({ bookingID: value._id, date: value.date, slotID: value.slot })
    );
    navigate("/dashboard/confirm_slot");
  };

  return (
    <IconButton onClick={() => handleClick()}>
      <EditSharpIcon />
    </IconButton>
  );
};
const CustomCellRenderer = ({ value }) => {
  return <span>{value}</span>;
};
