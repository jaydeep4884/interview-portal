import { Box, Typography } from "@mui/material";
import React from "react";

function TotalCategoryCount({ Title, Count }) {
  return (
    <>
      <Box
        sx={{
          boxShadow: "0px 0px 5px #ccc",
          padding: "20px",
          borderRadius: "5px",
          textAlign: "center",
          backgroundColor: "#fff",
          alignContent:"stretch"
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: 700 }}>
          {Title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {Count}
        </Typography>
      </Box>
    </>
  );
}

export default TotalCategoryCount;
