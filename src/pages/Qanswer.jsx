import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Badge,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";
import { Form, Field, Formik } from "formik";
import axios from "axios";

const categories = [
  {
    id: 1,
    question: "What is React Jsx ?",
    answer: "I don't Know !!",
    subcat: "Hello",
    cat: "Hello",
  },
  {
    id: 2,
    question: "Hello How Are you?",
    answer: "I am Fine !!",
    subcat: "",
    cat: "",
  },
];

const Qanswer = () => {
  const [open, setOpen] = useState(false);
  const [ini, setIni] = useState({
    questions: "",
    answer: "",
    subcategoryID: "",
  });
  const [qaData, setQaData] = useState([]);
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjE4MzU3NX0.Xwtx7dNyxspgDzx_WCS5nhRr8D46VrS0mkSfd-4aXFE";

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    handleClose();
    resetForm();
  };

  const getQaData = async () => {
    try {
      await axios
        .get("https://interviewback-ucb4.onrender.com/questions/", {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setQaData(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteData = () => {
    console.log("====================================");
    console.log();
    console.log("====================================");
  };

  const updateData = () => {
    console.log("====================================");
    console.log();
    console.log("====================================");
  };

  useEffect(() => {
    getQaData();
  }, []);
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Navbar />
        <Box
          sx={{
            position: "absolute",
            left: "15rem",
            top: "5.5rem",
            width: "calc(100% - 15rem)",
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "end", marginBottom: "20px" }}>
              <Button variant="contained" onClick={handleClickOpen}>
                Add Q & A
              </Button>
            </Box>

            {/* Dialog Component */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Q & A</DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                })}
              >
                <CloseIcon />
              </IconButton>

              <Formik
                enableReinitialize
                initialValues={ini}
                onSubmit={handleSubmit}
              >
                <Form>
                  <DialogContent dividers>
                    <Field
                      as={TextField}
                      sx={{ marginBottom: "16px" }}
                      name="questions"
                      label="Question"
                      type="text"
                      fullWidth
                      variant="outlined"
                    />

                    <Field
                      as={TextField}
                      sx={{ marginBottom: "16px" }}
                      name="answer"
                      label="Answer"
                      type="text"
                      fullWidth
                      variant="outlined"
                    />

                    <Field
                      as={TextField}
                      fullWidth
                      select
                      label="Sub-Category Name"
                      name="subcategoryID"
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.id} value={option.subcat}>
                          {option.subcat || "No Sub-Category"}
                        </MenuItem>
                      ))}
                    </Field>

                    <DialogActions>
                      <Field as={Button} type="submit" variant="contained">
                        Submit
                      </Field>
                    </DialogActions>
                  </DialogContent>
                </Form>
              </Formik>
            </Dialog>

            {/* Table Section */}
            <TableContainer
              sx={{
                border: "1px solid rgb(204, 204, 204)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "rgb(25, 118, 210)" }}>
                  <TableRow>
                    <TableCell sx={TableCellStyle}>No</TableCell>
                    <TableCell sx={TableCellStyle}>Question</TableCell>
                    <TableCell sx={TableCellStyle}>Answer</TableCell>
                    <TableCell sx={TableCellStyle}>Sub Category</TableCell>
                    <TableCell sx={TableCellStyle}>Category</TableCell>
                    <TableCell sx={TableCellStyle}>Delete</TableCell>
                    <TableCell sx={TableCellStyle}>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {qaData.map((el, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{el.questions}</TableCell>
                      <TableCell>{el.answer}</TableCell>
                      <TableCell>
                        <Badge color="secondary" variant="dot">
                          {el.subcategoryID.subCategoryname}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge color="secondary" variant="dot">
                          {el.subcategoryID.categoryID.categoryName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteData(i)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() => updateData(el)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
        <Toaster />
      </Box>
    </>
  );
};

export default Qanswer;
const TableCellStyle = {
  color: "white",
};
