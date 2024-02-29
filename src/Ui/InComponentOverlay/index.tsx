import { Box, CircularProgress } from "@mui/material";
import React from "react";

function InComponentOverlay({ open }: { open: boolean }) {
  if (!open) return <></>;
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#c0c0c075",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
        fontSize: "1rem",
        borderRadius: "5px",
        zIndex: 3,
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
}

export default InComponentOverlay;
