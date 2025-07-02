import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { token } from "../assets/contexts";
import Loader from "../components/Loader";

const SignUp = () => {
  const Token = useContext(token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await axios.post(
        "https://interviewback-ucb4.onrender.com/admin/signup",
        values,
        {
          headers: { Authorization: Token },
        }
      );
      toast.success("User Created Successfully!");
      navigate("/admin");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Signup Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Toaster />
      {loading && <Loader />}

      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3, color: "blue", fontWeight: "bold" }}
        >
          Sign Up
        </Typography>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            {[
              { name: "firstname", label: "First Name" },
              { name: "lastname", label: "Last Name" },
              { name: "contact", label: "Contact Number" },
              { name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" },
            ].map(({ name, label, type = "text" }) => (
              <Field
                key={name}
                as={TextField}
                name={name}
                label={label}
                type={type}
                fullWidth
                required
                variant="standard"
                sx={{ mb: 2 }}
              />
            ))}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              disabled={loading}
            >
              Submit
            </Button>
          </Form>
        </Formik>

        <Typography align="center" sx={{ mt: 2, fontSize: 14 }}>
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#1976d2",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
