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
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";

const categories = [
  {
    id: 1,
    question: "What is React Jsx ?",
    answer: "I don't Know !!",
    subcat: "",
    cat: "",
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
      subCategory: "",
    },
    onSubmit: (values, { resetForm }) => {
      resetForm();
      handleClose();
      toast.success("Sub Category Added Successfully!");
      console.log("Form Submit:", values);
    },
  });

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
              <form onSubmit={formik.handleSubmit}>
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

                <DialogContent dividers>
                  <TextField
                    sx={{ marginBottom: "16px" }}
                    id="question"
                    name="question"
                    label="Question"
                    onChange={formik.handleChange}
                    value={formik.values.question}
                    type="text"
                    fullWidth
                    variant="outlined"
                  />

                  <TextField
                    sx={{ marginBottom: "16px" }}
                    id="answer"
                    name="answer"
                    label="Answer"
                    onChange={formik.handleChange}
                    value={formik.values.answer}
                    type="text"
                    fullWidth
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    select
                    label="Sub-Category Name"
                    name="subCategory"
                    value={formik.values.subCategory}
                    onChange={formik.handleChange}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.id} value={option.subcat}>
                        {option.subcat || "No Sub-Category"}
                      </MenuItem>
                    ))}
                  </TextField>
                </DialogContent>

                <DialogActions>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </DialogActions>
              </form>
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
                    <TableCell sx={{ color: "white" }}>No</TableCell>
                    <TableCell sx={{ color: "white" }}>Question</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "end" }}>
                      Answer
                    </TableCell>
                    <TableCell sx={{ color: "white", textAlign: "end" }}>
                      Sub Category
                    </TableCell>
                    <TableCell sx={{ color: "white", textAlign: "end" }}>
                      Category
                    </TableCell>
                    <TableCell sx={{ color: "white", textAlign: "end" }}>
                      Delete
                    </TableCell>
                    <TableCell sx={{ color: "white", textAlign: "end" }}>
                      Update
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.question}</TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        {category.answer}
                      </TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        {category.subcat}
                      </TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        {category.cat}
                      </TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        <IconButton aria-label="edit">
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
