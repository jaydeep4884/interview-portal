import React, { useState } from "react";
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
  TextField,
} from "@mui/material";
import Searchbar from "../components/Searchbar";
import TableCmp from "../components/TableCmp";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";

const categories = [
  { id: 1, name: "Backend", status: <Switch defaultChecked /> },
  { id: 2, name: "Front-End", status: <Switch defaultChecked /> },
];
function SubCat() {
  const [open, setOpen] = useState(false);

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
      resetForm();
      handleClose();
      toast.success("Sub Category Add Successfully !!");
      console.log("Form Submit !!", values);
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
                <form onSubmit={formik.handleSubmit}>
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

                  <DialogContent dividers={Paper}>
                    <TextField
                      sx={{ marginBottom: "16px" }}
                      id="category"
                      name="category"
                      label="Sub Category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
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
                  </DialogContent>
                  <DialogActions>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Box>
            <TableCmp />
          </Container>
        </Box>
        <Toaster />
      </Box>
    </>
  );
}

export default SubCat;
