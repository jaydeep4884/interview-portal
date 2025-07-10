import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";
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
  const [subCatData, setSubCatData] = useState([]);
  const Token = useContext(token);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const url = id
        ? `https://interviewback-ucb4.onrender.com/questions/${id}`
        : "https://interviewback-ucb4.onrender.com/questions/create";
      const method = id ? "patch" : "post";

      await axios[method](url, values, {
        headers: { Authorization: Token },
      });

      toast.success(
        id ? "Data Updated Successfully!" : "Question Added Successfully!"
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
    setIni({ questions: "", answer: "", subcategoryID: "" });
  };

  const getQaData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://interviewback-ucb4.onrender.com/questions/",
        {
          headers: { Authorization: Token },
        }
      );
      setQaData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubCatData = async () => {
    try {
      const res = await axios.get(
        "https://interviewback-ucb4.onrender.com/subcategory/",
        {
          headers: { Authorization: Token },
        }
      );
      setSubCatData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://interviewback-ucb4.onrender.com/questions/${id}`,
        {
          headers: { Authorization: Token },
        }
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
      subcategoryID: el.subcategoryID?._id || "",
    });
    setId(el._id);
    setOpen(true);
  };

  useEffect(() => {
    getQaData();
    getSubCatData();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Box sx={{ textAlign: "end", mb: 2 }}>
        <Button
          variant="contained"
          sx={{ background: "#2F3C7E" }}
          onClick={() => setOpen(true)}
        >
          Add Q & A
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} fullScreen={isMobile}>
        <DialogTitle sx={{ fontSize: isMobile ? "18px" : "24px" }}>
          Add Q & A
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
        >
          <CloseIcon />
        </IconButton>
        <Formik initialValues={ini} onSubmit={handleSubmit} enableReinitialize>
          <Form>
            <DialogContent dividers>
              <Field
                as={TextField}
                name="questions"
                label="Question"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                name="answer"
                label="Answer"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                select
                name="subcategoryID"
                label="Sub-Category Name"
                fullWidth
                variant="outlined"
              >
                {subCatData.map((el) => (
                  <MenuItem key={el._id} value={el._id}>
                    {el.subCategoryname}
                  </MenuItem>
                ))}
              </Field>
              <DialogActions sx={{ mt: 2 }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Form>
        </Formik>
      </Dialog>

      <Box sx={{ overflowX: "auto", mt: 2 }}>
        <TableContainer
          sx={{
            border: "1px solid rgb(204, 204, 204)",
            borderRadius: "4px",
            minWidth: 700,
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#2F3C7E" }}>
              <TableRow>
                {[
                  "No",
                  "Question",
                  "Answer",
                  "Sub-Cat",
                  "Category",
                  "Delete",
                  "Update",
                ].map((head) => (
                  <TableCell key={head} sx={{ color: "white" }}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody sx={{ position: "relative" }}>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{ height: "200px", width: "100%" }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "50%",
                      }}
                    >
                      <Loader />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              qaData.map((el, i) => (
                <TableBody key={i}>
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
                </TableBody>
              ))
            )}
          </Table>
        </TableContainer>
      </Box>

      <Toaster />
    </Box>
  );
};

export default Qanswer;
