import React from "react";
import { Backdrop, Modal, Fade, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalBox({ open, handleClose, children }) {
  if (!open) return null;
  return (
    <div>
      <Modal
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "80%",
              bgcolor: "#fff",
              boxShadow: 24,
              padding: "2.8rem",
              borderRadius: "5px",
              overflow: "hidden",
              //   overflowY: "scroll",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                right: 12,
                top: 12,
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
