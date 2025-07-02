import { Box } from "@mui/material";
import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HashLoader size={30} color="#73946B" />
      </Box>
    </>
  );
};

export default Loader;
