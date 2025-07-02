import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Form, Field, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const ini = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios
        .post("https://interviewback-ucb4.onrender.com/admin/login", values)
        .then((res) => {
          if (res.data.status === "success") {
            toast.success("Login Successfully!!");
            navigate("/admin");
          }
        });
    } catch (error) {
      toast.error("Invalid Email or Password!!");
      console.log(error);
    }
    resetForm();
  };

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
              <Formik initialValues={ini} onSubmit={handleSubmit}>
                <Form>
                  <Field
                    as={TextField}
                    name="email"
                    variant="outlined"
                    label="Email"
                    sx={InputStyle}
                    required
                  />

                  <Field
                    as={TextField}
                    name="password"
                    type="password"
                    variant="outlined"
                    label="Password"
                    sx={InputStyle}
                    required
                  />

                  <Field
                    as={Button}
                    fullWidth
                    color="primary"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Field>
                </Form>
              </Formik>
              <Box sx={{ marginTop: "15px", textAlign: "center" }}>
                <Typography>
                  Don't Have an Account ?{" "}
                  <Link color="inherit" to={'/signup'}>
                    SignUp
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Toaster />
      </Container>
    </>
  );
}

export default Login;

const InputStyle = {
  width: "100%",
  marginBottom: "20px",
};
