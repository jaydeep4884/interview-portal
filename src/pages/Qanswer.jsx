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
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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
  const Token = useContext(token)

  const handleSubmit = async (values, { resetForm }) => {
    if (id !== null) {
      try {
        await axios
          .patch(
            `https://interviewback-ucb4.onrender.com/questions/${id}`,
            values,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setIni({
              questions: "",
              answer: "",
              subcategoryID: "",
            });
            setId(null);
            toast.success("Data Update SuccessFully !!");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios
          .post(
            "https://interviewback-ucb4.onrender.com/questions/create",
            values,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            toast.success("Question Add Successfully !!");
          });
      } catch (error) {
        console.log(error);
      }
    }

    console.log(values);
    handleClose();
    resetForm();
    getQaData();
  };

  const getQaData = async () => {
    setIsLoading(true);
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
          setIsLoading(false);
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

  const deleteData = async (id) => {
    try {
      await axios
        .delete(`https://interviewback-ucb4.onrender.com/questions/${id}`, {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Question Deleted !!");
          getQaData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (el) => {
    handleClickOpen();
    setIni({
      questions: el.questions,
      answer: el.answer,
      subcategoryID: el.subcategoryID.subCategoryname,
    });
    setId(el._id);
  };

  useEffect(() => {
    getQaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      {qaData.map((el, i) => (
                        <MenuItem key={i} value={el.subcategoryID?._id || ""}>
                          {el.subcategoryID?.subCategoryname ||
                            "No Sub-Category"}
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
                  <TableBody>
                    {qaData.map((el, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{el.questions}</TableCell>
                        <TableCell>{el.answer}</TableCell>
                        <TableCell>
                          <Badge color="secondary" variant="dot">
                            {el.subcategoryID?.subCategoryname ||
                              "No Sub-Category"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge color="secondary" variant="dot">
                            {el.subcategoryID?.categoryID?.categoryName ||
                              "No Category"}
                          </Badge>
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
                    ))}
                  </TableBody>
                )}
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
