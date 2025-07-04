import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { token } from "../assets/contexts";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

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
        { headers: { Authorization: Token } }
      );
      toast.success("User Created Successfully!");
      navigate("/admin");
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Signup Failed!");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "firstname", label: "First Name" },
    { name: "lastname", label: "Last Name" },
    { name: "contact", label: "Contact Number" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        flexDirection: "column",
        gap: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toaster />
      {loading && <Loader />}

      <Box
        sx={{
          width: "90%",
          maxWidth: 400,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 1, color: "#2F3C7E", fontWeight: "bold" }}
        >
          Sign Up
        </Typography>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            {fields.map(({ name, label, type = "text" }) => (
              <Field
                key={name}
                as={TextField}
                name={name}
                label={label}
                type={type}
                fullWidth
                required
                variant="standard"
                sx={{ mb: 1 }}
              />
            ))}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, fontWeight: 600, backgroundColor: "#2F3C7E" }}
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
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
      <Footer />
    </Container>
  );
};

export default SignUp;
