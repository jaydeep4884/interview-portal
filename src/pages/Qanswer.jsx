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
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";
import { Form, Field, Formik } from "formik";
import axios from "axios";
import Loader from "../components/Loader";
import { token } from "../assets/contexts";

const Qanswer = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ini, setIni] = useState({
    questions: "",
    answer: "",
    subcategoryID: "",
  });
  const [id, setId] = useState(null);
  const [qaData, setQaData] = useState([]);
  const Token = useContext(token);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response =
        id !== null
          ? await axios.patch(
              `https://interviewback-ucb4.onrender.com/questions/${id}`,
              values,
              { headers: { Authorization: Token } }
            )
          : await axios.post(
              "https://interviewback-ucb4.onrender.com/questions/create",
              values,
              { headers: { Authorization: Token } }
            );

      console.log(response.data);
      toast.success(
        id !== null
          ? "Data Updated Successfully!"
          : "Question Added Successfully!"
      );
      resetForm();
      setId(null);
      handleClose();
      getQaData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getQaData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://interviewback-ucb4.onrender.com/questions/",
        { headers: { Authorization: Token } }
      );
      setQaData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://interviewback-ucb4.onrender.com/questions/${id}`,
        { headers: { Authorization: Token } }
      );
      toast.success("Question Deleted!");
      getQaData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = (el) => {
    setIni({
      questions: el.questions,
      answer: el.answer,
      subcategoryID: el.subcategoryID.subCategoryname,
    });
    setId(el._id);
    setOpen(true);
  };

  useEffect(() => {
    getQaData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "end", marginBottom: "20px" }}>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Add Q & A
            </Button>
          </Box>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Q & A</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
            >
              <CloseIcon />
            </IconButton>
            <Formik
              initialValues={ini}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              <Form>
                <DialogContent dividers>
                  <Field
                    as={TextField}
                    sx={{ marginBottom: "16px" }}
                    name="questions"
                    label="Question"
                    fullWidth
                    variant="outlined"
                  />
                  <Field
                    as={TextField}
                    sx={{ marginBottom: "16px" }}
                    name="answer"
                    label="Answer"
                    fullWidth
                    variant="outlined"
                  />
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    label="Sub-Category Name"
                    name="subcategoryID"
                  >
                    {qaData.map((el, i) => (
                      <MenuItem key={i} value={el.subcategoryID?._id || ""}>
                        {el.subcategoryID?.subCategoryname || "No Sub-Category"}
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

          <TableContainer
            sx={{ border: "1px solid rgb(204, 204, 204)", borderRadius: "3px" }}
          >
            <Table>
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ height: "200px" }}>
                      <Loader />
                    </TableCell>
                  </TableRow>
                ) : (
                  qaData.map((el, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{el.questions}</TableCell>
                      <TableCell>{el.answer}</TableCell>
                      <TableCell>
                        {el.subcategoryID?.subCategoryname || "No Sub-Category"}
                      </TableCell>
                      <TableCell>
                        {el.subcategoryID?.categoryID?.categoryName ||
                          "No Category"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteData(el._id)}
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
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Toaster />
      </Box>
    </>
  );
};

export default Qanswer;

const TableCellStyle = { color: "white" };
