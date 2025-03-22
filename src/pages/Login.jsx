import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router";


function Login() {
  const validate = (values) => {
    const error = {};
    if (!values.email) {
      error.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      error.email = "Invalid Email Address";
    }

    if (!values.password) {
      error.password = "Required";
    } else if (values.password.length > 10) {
      error.password = "Must be 10 char or less";
    }

    return error;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
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
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}

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

                {formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}

                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  {/* <NavLink
                    to="/admin"
                    style={{
                      width: "100%",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    Submit
                  </NavLink> */}
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
