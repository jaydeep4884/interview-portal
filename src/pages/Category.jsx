import React, { useContext, useEffect, useState } from "react";
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
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Form, Field, Formik } from "formik";
import Loader from "../components/Loader";
import { token, displayStyle } from "../assets/contexts";

function Category() {
  const [formValues, setFormValues] = useState({ categoryName: "" });
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Token = useContext(token);
  const display = useContext(displayStyle);

  const toggleDialog = () => setOpenDialog((prev) => !prev);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const url = id
        ? `https://interviewback-ucb4.onrender.com/category/${id}`
        : "https://interviewback-ucb4.onrender.com/category/create";
      const method = id ? "patch" : "post";
      await axios[method](url, values, { headers: { Authorization: Token } });

      const successMessage = id ? "Data Updated" : "Data Created Successfully";
      toast.success(successMessage);
      resetForm();
      setFormValues({ categoryName: "" });
      setId(null);
      fetchData();
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error(error);
    }
    toggleDialog();
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://interviewback-ucb4.onrender.com/category/${id}`,
        {
          headers: { Authorization: Token },
        }
      );
      toast.success("Category Deleted Successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  const updateData = (el) => {
    setFormValues({ categoryName: el.categoryName });
    setId(el._id);
    toggleDialog();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://interviewback-ucb4.onrender.com/category/",
        {
          headers: { Authorization: Token },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (el) => {
    const newStatus = el.status === "on" ? "off" : "on";
    try {
      await axios.patch(
        `https://interviewback-ucb4.onrender.com/category/${el._id}`,
        { status: newStatus },
        {
          headers: { Authorization: Token },
        }
      );
      toast.success("Status Updated!");
      fetchData();
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={display}>
          <TextField
            select
            fullWidth
            label="Search Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            {data.map((el) => (
              <MenuItem key={el._id} value={el.categoryName}>
                {el.categoryName}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" onClick={toggleDialog}>
            Add Category
          </Button>

          <Dialog open={openDialog}>
            <DialogTitle>Add Category</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={toggleDialog}
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
              initialValues={formValues}
              onSubmit={handleSubmit}
            >
              <Form>
                <DialogContent dividers={Paper}>
                  <Field
                    as={TextField}
                    name="categoryName"
                    label="Category"
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
          <Table>
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

            {isLoading ? (
              <TableBody sx={{ position: "relative" }}>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{ height: "200px", width: "100%" }}
                  >
                    <Box
                      sx={{ position: "absolute", top: "50%", right: "50%" }}
                    >
                      <Loader />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {data.map((el, index) => (
                  <TableRow key={el._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{el.categoryName}</TableCell>
                    <TableCell sx={{ textAlign: "end" }}>
                      <Switch
                        checked={el.status === "on"}
                        color="secondary"
                        onChange={() => toggleStatus(el)}
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
      <Toaster />
    </Box>
  );
}

export default Category;
