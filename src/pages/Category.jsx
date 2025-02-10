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
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Category() {
  let [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    onSubmit: (values, { resetForm }) => {
      let dataCopy = JSON.parse(localStorage.getItem("data")) || [];
      if (formik.values.category !== "") {
        if (id >= 0) {
          dataCopy.splice(id, 1, values);
          setId(-1);
          toast.success("Category Update Successfully !!");
        } else {
          dataCopy.push(values);
          console.log("Form Submit !!", dataCopy);
          toast.success("Category Add Successfully !!");
        }
        localStorage.setItem("data", JSON.stringify(dataCopy));
        handleClose();
        resetForm();
        FetchData();
      }
    },
  });

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
    formik.setValues(dataCopy[index]);
    setId(index);
  };

  const FetchData = () => {
    let dataCopy = JSON.parse(localStorage.getItem("data")) || [];
    setData(dataCopy);
  };

  useEffect(() => {
    FetchData();
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
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                columnGap: "16px",
                marginBottom: "20px",
              }}
            >
              <TextField fullWidth label="Search Category">
                {data.map((el, i) => (
                  <MenuItem key={i} value={el.category}>
                    {el.category}
                  </MenuItem>
                ))}
              </TextField>

              <Button variant="contained" onClick={handleClickOpen}>
                Add Category
              </Button>

              <Dialog open={open}>
                <form onSubmit={formik.handleSubmit}>
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
                    <TextField
                      id="category"
                      name="category"
                      label="Category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      type="text"
                      fullWidth
                      variant="outlined"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </DialogActions>
                </form>
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
                      <TableCell>{el.category}</TableCell>
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
