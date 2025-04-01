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
import toast, { Toaster } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Field, Formik } from "formik";
import axios from "axios";
import Loader from "../components/Loader";
import { displayStyle, token } from "../assets/contexts";

function SubCat() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [ini, setIni] = useState({
    subCategoryname: "",
    categoryID: "",
  });
  const [id, setId] = useState(null);
  const [subCatData, setSubCatData] = useState([]);
  const Token = useContext(token);
  const display = useContext(displayStyle);
  const handleSubmit = async (values, { resetForm }) => {
    if (id !== null) {
      try {
        await axios
          .patch(
            `https://interviewback-ucb4.onrender.com/subcategory/${id}`,
            values,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            setId(null);
            setIni({
              subCategoryname: "",
              categoryID: "",
            });
            toast.success("Data Updated !");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios
          .post(
            "https://interviewback-ucb4.onrender.com/subcategory/create",
            values,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            toast.success("Sub Category Added !!");
          });
      } catch (error) {
        console.log(error);
      }
    }

    console.log(values);
    resetForm();
    handleClose();
    getSubCategory();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSubCategory = async () => {
    setIsLoading(true);
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
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubCatData = async (id) => {
    try {
      await axios
        .delete(`https://interviewback-ucb4.onrender.com/subcategory/${id}`, {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          toast.success("Data Deleted !!");
          getSubCategory();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateSubCatData = async (el) => {
    handleClickOpen();
    setIni({
      subCategoryname: el.subCategoryname,
      categoryID: el.categoryID.categoryName,
    });
    setId(el._id);
  };

  const toggleStatus = async (el) => {
    const newStatus = el.status === "on" ? "off" : "on";

    try {
      await axios.patch(
        `https://interviewback-ucb4.onrender.com/subcategory/${el._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      toast.success("Status Updated!");
      getSubCategory();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  useEffect(() => {
    getSubCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box>
        <Box>
          <Container maxWidth="lg">
            <Box sx={display}>
              <TextField
                select
                fullWidth
                label="Search Sub-Category"
                value={search}
                onSelect={(e) => setSearch(e.target.value)}
              >
                {subCatData.map((el, i) => (
                  <MenuItem key={i} value={el._id}>
                    {el.subCategoryname}
                  </MenuItem>
                ))}
              </TextField>
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
                      <Field
                        as={TextField}
                        fullWidth
                        name="categoryID"
                        select
                        label="Category Name"
                      >
                        {subCatData.map((el, i) => (
                          <MenuItem key={i} value={el.categoryID._id}>
                            {el.categoryID.categoryName}
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
                        Sub-Category Name
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        Category Name
                      </TableCell>
                      <TableCell sx={TabelCellStyle}>Status</TableCell>
                      <TableCell sx={TabelCellStyle}>Delete</TableCell>
                      <TableCell sx={TabelCellStyle}>Update</TableCell>
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
                      {subCatData.map((el, i) => (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{el.subCategoryname}</TableCell>
                          <TableCell>{el.categoryID.categoryName}</TableCell>
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
                              onClick={() => deleteSubCatData(el._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ textAlign: "end" }}>
                            <IconButton
                              aria-label="delete"
                              onClick={() => updateSubCatData(el)}
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
            </Box>
          </Container>
        </Box>
        <Toaster />
      </Box>
    </>
  );
}

export default SubCat;
const TabelCellStyle = {
  color: "white",
  textAlign: "end",
};
