import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const InputStyle = {
  width: "100%",
  mb: 1,
};

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://interviewback-ucb4.onrender.com/admin/login",
        values
      );
      if (res.data.status === "success") {
        toast.success("Login Successfully!!");
        navigate("/admin");
      }
    } catch (err) {
      toast.error("Invalid Email or Password!!");
      console.log(err);
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <Container maxWidth="100%">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {loading && <Loader />}
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            width: "90%",
            boxShadow: 3,
            maxWidth: 350,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "#2F3C7E", fontWeight: "bold", mb: 2 }}
          >
            Admin Panel
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                as={TextField}
                name="email"
                label="Email"
                size="small"
                placeholder="Enter your email"
                variant="standard"
                sx={InputStyle}
                required
              />

              <Field
                as={TextField}
                name="password"
                label="Password"
                size="small"
                placeholder="Enter your password"
                variant="standard"
                type={showPass ? "text" : "password"}
                sx={InputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPass ? (
                        <Eye
                          onClick={() => setShowPass(false)}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <EyeOff
                          onClick={() => setShowPass(true)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  fontWeight: 600,
                  backgroundColor: "#2F3C7E !important",
                  mt: 2,
                }}
              >
                Submit
              </Button>
            </Form>
          </Formik>

          <Typography align="center" sx={{ mt: 2, fontSize: 14 }}>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              style={{ fontWeight: 600, textDecoration: "none" }}
            >
              SignUp
            </Link>
          </Typography>
        </Box>
        <Footer />
      </Box>
      <Toaster />
    </Container>
  );
};

export default Login;
