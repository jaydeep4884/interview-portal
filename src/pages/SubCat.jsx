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
  MenuItem,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Searchbar from "../components/Searchbar";
import toast, { Toaster } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Field, Formik } from "formik";
import axios from "axios";

const categories = [
  { id: 1, name: "Backend", status: <Switch defaultChecked /> },
  { id: 2, name: "Front-End", status: <Switch defaultChecked /> },
];
function SubCat() {
  const [open, setOpen] = useState(false);
  const [ini, setIni] = useState({
    subCategoryname: "",

  });
  const [subCatData, setSubCatData] = useState([]);
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjE4MzU3NX0.Xwtx7dNyxspgDzx_WCS5nhRr8D46VrS0mkSfd-4aXFE";

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSubCategory = async () => {
    try {
      await axios
        .get("https://interviewback-ucb4.onrender.com/subcategory/", {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setSubCatData(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSubCategory();
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
              <Searchbar />
              <Button variant="contained" onClick={handleClickOpen}>
                Add Sub Category
              </Button>
              <Dialog open={open}>
                <DialogTitle>Add Sub Category</DialogTitle>
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
                        sx={{ marginBottom: "16px" }}
                        name="subCategoryname"
                        label="Sub Category"
                        type="text"
                        fullWidth
                        variant="outlined"
                      />
                      <TextField fullWidth select label="Category Name">
                        {categories.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
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

            <Box>
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
                      <TableCell sx={{ color: "white" }}>
                        Category Name
                      </TableCell>
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
                    {subCatData.map((el, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{el.subCategoryname}</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          <Switch
                            checked={el.status === "on" ? true : false}
                            color="secondary"
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          <IconButton aria-label="delete">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Container>
        </Box>
        <Toaster />
      </Box>
    </>
  );
}

export default SubCat;
