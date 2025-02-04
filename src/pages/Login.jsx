import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
      toast.success("Login Successfully !!");
    },
  });
  return (
    <>
      <Container maxWidth="100%">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              padding: "25px",
              border: "2px solid #1976d2",
              boxShadow: "0 0 5px #1976d2",
              borderRadius: "25px",
              width: "28%",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "34px",
                color: "#1976D2",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Admin Panel
            </Typography>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  variant="outlined"
                  label="Email"
                  sx={{ width: "100%", marginBottom: "20px" }}
                ></TextField>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  variant="outlined"
                  label="Password"
                  sx={{ width: "100%", marginBottom: "20px" }}
                ></TextField>
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
        <Toaster />
      </Container>
    </>
  );
}

export default Login;
