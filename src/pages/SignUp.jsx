import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function SignUp() {
  const [ini, setIni] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjE4MzU3NX0.Xwtx7dNyxspgDzx_WCS5nhRr8D46VrS0mkSfd-4aXFE";

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios
        .post("https://interviewback-ucb4.onrender.com/admin/signup", values, {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("./admin.jsx");
          toast.success("User Created Successfully !");
          // "wuxy@mailinator.com" USER_2
          // jygy@mailinator.com USER_3
        });
    } catch (error) {
      console.log(error);
    }
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
                    Submit
                  </Field>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Box>
        <Toaster />
      </Container>
    </>
  );
}

export default SignUp;

const InputStyle = {
  width: "100%",
  marginBottom: "20px",
};
