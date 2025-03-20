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
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Form, Field, Formik } from "formik";

function Category() {
  const [ini, setIni] = useState({
    category: "",
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

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    handleClose();
    setSearch("");
    FetchData();
    toast.success("Category Add Successfully !!");
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     category: "",
  //   },
  //   onSubmit: async (values, { resetForm }) => {
  //     if (formik.values.category !== "") {
  //       try {
  //         await axios
  //           .post(
  //             "https://interviewback-ucb4.onrender.com/category/create",
  //             values,
  //             {
  //               headers: {
  //                 Authorization: Token,
  //               },
  //             }
  //           )
  //           .then((res) => {
  //             console.log(res.data);
  //           })
  //           .catch((err) => console.log(err));
  //         console.log(values);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   },
  // });

  const deleteData = (index) => {
    let dataCopy = JSON.parse(localStorage.getItem("data")) || [];
    dataCopy.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(dataCopy));
    FetchData();
    toast.success("Category Delete Successfully !!");
  };

  const updateData = (index) => {
    setOpen(true);
    let dataCopy = JSON.parse(localStorage.getItem("data")) || [];
    // formik.setValues(dataCopy[index]);
    setId(index);
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
          console.log(res.data);
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
            <Formik
              enableReinitialize
              initialValues={ini}
              onSubmit={handleSubmit}
            >
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    columnGap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <Field as={TextField} fullWidth label="Search Category" />

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

                    <DialogContent dividers={Paper}>
                      <Field
                        as={TextField}
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Field as={Button} type="submit" variant="contained">
                        Submit
                      </Field>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Form>
            </Formik>

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
                        <Switch />
                      </TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteData(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ textAlign: "end" }}>
                        <IconButton
                          aria-label="delete"
                          onClick={() => updateData(index)}
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
