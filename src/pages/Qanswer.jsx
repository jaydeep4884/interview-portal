import {
  Box,
  Button,
  Container,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  IconButton,
  TableRow,
} from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const categories = [
  {
    id: 1,
    question: "What is React Jsx ?",
    anwer: "I don't Know !!",
    subcat: "",
    cat: "",
  },
  {
    id: 2,
    question: "Hello How Are yoy ?",
    anwer: "I am Fine !!",
    subcat: "",
    cat: "",
  },
];
const Qanswer = () => {
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
              <Button variant="contained">Add Sub Category</Button>
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
                      <TableCell sx={{ color: "white" }}>Question</TableCell>
                      <TableCell sx={{ color: "white", textAlign: "end" }}>
                        Answer
                      </TableCell>
                      <TableCell sx={{ color: "white", textAlign: "end" }}>
                        Sub Category
                      </TableCell>
                      <TableCell sx={{ color: "white", textAlign: "end" }}>
                        Category
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
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell>{category.question}</TableCell>
                        <TableCell sx={{ textAlign: "end" }}>
                          {category.anwer}
                        </TableCell>
                        <TableCell>{category.subcat}</TableCell>
                        <TableCell>{category.cat}</TableCell>

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
      </Box>
    </>
  );
};

export default Qanswer;
