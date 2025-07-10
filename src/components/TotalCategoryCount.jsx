import { Paper, Typography, Box } from "@mui/material";
import React from "react";

function TotalCategoryCount({ Title, Count }) {
  return (
    <Paper
      sx={{
        flex: "1 1 250px", // allows responsive resizing
        maxWidth: "100%",
        minWidth: 250,
        padding: 2,
        borderRadius: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
        border: " 1px solid #ddd",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "600",
            mb: 1,
            fontSize: { xs: "26px", sm: "26px", md: "28px" },
          }}
        >
          {Title}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "50px", sm: "52px", md: "56px" },
          }}
        >
          {Count}
        </Typography>
      </Box>
    </Paper>
  );
}

export default TotalCategoryCount;
