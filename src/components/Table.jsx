import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({
  data,
  handleGetRow,
  headers,
  height = "80vh",
  message = "No Bookings found.",
}) => {
  return (
    <Box height={height} width={"100%"}>
      {data && headers ? (
        <DataGrid rows={data} columns={headers} getRowId={handleGetRow} />
      ) : (
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          mt={"80px"}
          justifySelf={"center"}
          fontWeight={600}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Table;
