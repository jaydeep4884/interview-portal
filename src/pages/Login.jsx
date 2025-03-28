import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Form, Field, Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import { token } from "../assets/contexts";

function Login() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [ini, setIni] = useState({
    email: "",
    password: "",
  });
  const Token = useContext(token);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios
        .post("https://interviewback-ucb4.onrender.com/admin/login", values, {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          if (res.data.status === "success") {
            navigate("/admin");
            toast.success("Login Successfully !!");
            // "wuxy@mailinator.com" USER_2
            // jygy@mailinator.com USER_3
          }
        });
    } catch (error) {
      toast.error("Invalid Email and Password !!");
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
              <Formik
                enableReinitialize
                initialValues={ini}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Field
                    as={TextField}
                    name="email"
                    variant="outlined"
                    label="Email"
                    sx={InputStyle}
                  />

                  <Field
                    as={TextField}
                    name="password"
                    type="password"
                    variant="outlined"
                    label="Password"
                    sx={InputStyle}
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

export default Login;

const InputStyle = {
  width: "100%",
  marginBottom: "20px",
};
