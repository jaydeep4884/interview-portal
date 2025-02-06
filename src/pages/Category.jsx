import React from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const currencies = [
  {
    value: "Backend",
    label: "Backend",
  },
  {
    value: "Front-End",
    label: "Front-End",
  },
  {
    value: "Devops",
    label: "Devops",
  },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1", "Backend", 6.0, 24, 4.0),
  createData("2", "Fronted", 9.0, 37, 4.3),
];
function Category() {
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
                id="fullWidth"
                component="form"
                select
                label="Search Category"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button variant="contained">Add Category</Button>
            </Box>

            <TableContainer
              sx={{
                border: "1px solid rgb(204, 204, 204)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <Table aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "rgb(25, 118, 210)",
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>No</TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      Category Name
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      Status
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      Delete
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      Update
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Category;
