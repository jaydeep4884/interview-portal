import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router";

function Breadcrumb(props) {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "15px" }}>
      <NavLink
        style={{ textDecoration: "none", fontWeight: "500" }}
        to={"/admin"}
      >
        Dashboard
      </NavLink>
      <Typography fontWeight={500}>{props.name}</Typography>
    </Breadcrumbs>
  );
}

export default Breadcrumb;
