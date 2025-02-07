import {
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const categories = [
  { id: 1, name: "Backend", status: <Switch defaultChecked /> },
  { id: 2, name: "Front-End", status: <Switch defaultChecked /> },
];
function TableCmp() {
  return (
    <>
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
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell sx={{ textAlign: "end" }}>
                  {category.status}
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
    </>
  );
}

export default TableCmp;
