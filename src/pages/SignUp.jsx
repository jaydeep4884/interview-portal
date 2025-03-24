import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short FirstName")
    .max(50, "Too Large FirstName")
    .required("Required"),

  lastname: Yup.string()
    .min(2, "Too Short lastname")
    .max(50, "Too Large lastname")
    .required("Required"),

  contact: Yup.number().min(10, "Invalid Number").required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string()
    .min(2, "Too Short Password")
    .max(20, "Too Large Password")
    .required("Required"),
});

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
                validationSchema={SignUpSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      helperText={
                        errors.firstname && touched.firstname ? (
                          <label>{errors.firstname}</label>
                        ) : null
                      }
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
                    {errors.lastname && touched.lastname ? (
                      <div>{errors.lastname}</div>
                    ) : null}

                    <Field
                      as={TextField}
                      name="contact"
                      type="number"
                      variant="outlined"
                      label="Enter Contact Number"
                      sx={InputStyle}
                      required
                    />
                    {errors.contact && touched.contact ? (
                      <div>{errors.contact}</div>
                    ) : null}

                    <Field
                      as={TextField}
                      name="email"
                      type="email"
                      variant="outlined"
                      label="Enter Email"
                      sx={InputStyle}
                      required
                    />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}

                    <Field
                      as={TextField}
                      name="password"
                      type="password"
                      variant="outlined"
                      label="Enter Password"
                      sx={InputStyle}
                      required
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}

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
                )}
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
