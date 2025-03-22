import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";

const validate = (values) => {
  const error = {};
  if (!values.firstName) {
    error.firstName = "Required";
  } else if (values.firstName.length > 15) {
    error.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    error.lastName = "Required";
  } else if (values.lastName.length > 20) {
    error.lastName = "Must be 20 characters or less";
  }

  if (!values.contact) {
    error.contact = "Required";
  } else if (values.password.length >= 10) {
    error.contact = "Must be 10 Digits";
  }

  if (!values.email) {
    error.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = "Invalid Email Address";
  }

  if (!values.password) {
    error.password = "Required";
  } else if (values.password.length > 10) {
    error.password = "Must be 10 char or less";
  }

  return error;
};
function SignUp() {
  const [ini, setIni] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
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
              Sign Up
            </Typography>
            <Box>
              <Formik
                enableReinitialize
                initialValues={ini}
                validationSchema={validate}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Field
                    as={TextField}
                    name="firstname"
                    variant="outlined"
                    label="Enter Firstname"
                    sx={InputStyle}
                    required
                  />

                  <Field
                    as={TextField}
                    name="lastname"
                    variant="outlined"
                    label="Enter Lastname"
                    sx={InputStyle}
                    required
                  />

                  <Field
                    as={TextField}
                    name="contact"
                    type="number"
                    variant="outlined"
                    label="Enter Contact Number"
                    sx={InputStyle}
                    required
                  />

                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    variant="outlined"
                    label="Enter Email"
                    sx={InputStyle}
                    required
                  />

                  <Field
                    as={TextField}
                    name="password"
                    type="password"
                    variant="outlined"
                    label="Enter Password"
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
                    {/* <NavLink
                      to="/login"
                      style={{
                        width: "100%",
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      Submit
                    </NavLink> */}
                    Submit
                  </Field>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;

const InputStyle = {
  width: "100%",
  marginBottom: "20px",
};
