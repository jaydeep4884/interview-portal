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
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import Searchbar from "../components/Searchbar";
import TableCmp from "../components/TableCmp";

function Category() {
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
      toast.success("Category Add Successfully !!");
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

            <TableCmp />
          </Container>
        </Box>
        <Toaster />
      </Box>
    </>
  );
}

export default Category;
