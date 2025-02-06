import React from "react";
import Navbar from "../components/Navbar";
import { Box, Container, Typography, Grid } from "@mui/material";

const dashboardData = [
  { title: "Total Categories", value: 3 },
  { title: "Total Products", value: 15 },
  { title: "Total Users", value: 120 },
];

const StatBox = ({ title, value }) => (
  <Box
    sx={{
      boxShadow: "0px 0px 5px #ccc",
      padding: "20px",
      borderRadius: "5px",
      textAlign: "center",
      backgroundColor: "#fff",
    }}
  >
    <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: 700 }}>
      {title}
    </Typography>
    <Typography variant="h3" sx={{ fontWeight: 700 }}>
      {value}
    </Typography>
  </Box>
);

function Admin() {
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Navbar />
        <Box
          sx={{
            position: "absolute",
            left: "15rem",
            top: "5.5rem",
            width: "calc(100% - 15rem)",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {dashboardData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StatBox title={item.title} value={item.value} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Admin;
