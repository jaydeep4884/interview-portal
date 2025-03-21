import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Form, Field, Formik } from "formik";

function Category() {
  const [ini, setIni] = useState({
    categoryName: "",
  });
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjE4MzU3NX0.Xwtx7dNyxspgDzx_WCS5nhRr8D46VrS0mkSfd-4aXFE";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (id !== null) {
      try {
        await axios
          .patch(
            `https://interviewback-ucb4.onrender.com/category/${id}`,
            values,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((res) => {
            console.log("Data Updated !!");
            setIni({
              category: "",
            });
            setId(null);
            FetchData();
            toast.success("Data Updated !!");
            resetForm();
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios
          .post(
            "https://interviewback-ucb4.onrender.com/category/create",
            values,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            toast.success("Data Created Successfully.. !!");
            resetForm();
            FetchData();
          })
          .catch((err) => console.log(err));
      } catch (error) {
        toast.error("Something Went Wrong !");
      }
    }
    // console.log(values);

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteData = async (id) => {
    try {
      await axios
        .delete(`https://interviewback-ucb4.onrender.com/category/${id}`, {
          headers: {
            Authorization: Token,
          },
        })
        .then(() => {
          toast.success("Category Delete Successfully !!");
          FetchData();
        });
    } catch (error) {
      toast.error(error);
    }
  };

  const updateData = (el) => {
    setOpen(true);
    setIni({
      categoryName: el.categoryName,
    });
    setId(el._id);
  };

  const FetchData = async () => {
    try {
      await axios
        .get("https://interviewback-ucb4.onrender.com/category/", {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const searchingData = () => {
    let dataCopy = JSON.parse(localStorage.getItem("data")) || [];
    let searchValue = search.toLowerCase();
    setSearchData(
      dataCopy.filter((el) => el.category.toLowerCase().includes(searchValue))
    );
  };

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    searchingData();
    // eslint-disable-next-line
  }, [search]);
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
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                columnGap: "16px",
                marginBottom: "20px",
              }}
            >
              <TextField
                fullWidth
                label="Search Category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button variant="contained" onClick={handleClickOpen}>
                Add Category
              </Button>

              <Dialog open={open}>
                <DialogTitle>Add Category</DialogTitle>

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
                    <DialogContent dividers={Paper}>
                      <Field
                        as={TextField}
                        name="categoryName"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                      <DialogActions>
                        <Field as={Button} type="submit" variant="contained">
                          Submit
                        </Field>
                      </DialogActions>
                    </DialogContent>
                  </Form>
                </Formik>
              </Dialog>
            </Box>

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
                    <TableCell sx={{ color: "white" }}>Category Name</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "end" }}>
                      Status
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
                  {data.map((el, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{el.categoryName}</TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        <Switch
                          checked={el.status === "on" ? true : false}
                          color="secondary"
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteData(el._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        <IconButton
                          aria-label="delete"
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
}

export default Category;
