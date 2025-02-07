import { MenuItem, Switch, TextField } from "@mui/material";
import React from "react";

const categories = [
  { id: 1, name: "Backend", status: <Switch defaultChecked /> },
  { id: 2, name: "Front-End", status: <Switch defaultChecked /> },
];
function Searchbar() {
  return (
    <>
      <TextField fullWidth select label="Search Category">
        {categories.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}

export default Searchbar;
