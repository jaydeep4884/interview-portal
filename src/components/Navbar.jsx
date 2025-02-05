import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Breadcrumbs,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          minHeight: "64px",
          backgroundColor: "#1976d2",
          padding: "0 24px",
          display: "flex",
          alignItems: "stretch",
          boxShadow: "1px 1px 5px black",
        }}
      >
        <Box
          sx={{
            width: "18%",
            borderRight: "1px solid rgba(243, 236, 236, 0.95)",
            alignContent: "center",
            color: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
            }}
          >
            Interview Portal
          </Typography>
        </Box>

        <Box
          sx={{
            width: "82%",
            paddingLeft: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
            <Typography>Dashboard</Typography>
          </Breadcrumbs>

          <IconButton aria-label="delete" size="large">
            <NavLink to="/">
              <DoorBackIcon fontSize="inherit" sx={{ color: "white" }} />
            </NavLink>
          </IconButton>
        </Box>
      </Box>

      {/* Sidebar Items */}
      <Box
        sx={{
          padding: "0 16px",
          maxWidth: "209px",
          borderRight: "1px solid rgb(233 217 217 / 95%)",
        }}
      >
        <List>
          <ListItemButton
            sx={{
              backgroundColor: "#1976d2",
              margin: "16px 0",
              "&:hover": { backgroundColor: "#1565c0" },
              borderRadius: "5px",
            }}
          >
            <ListItemIcon>
              <MdSpaceDashboard style={{ height: "24px", width: "24px" }} />
            </ListItemIcon>
            <NavLink to="/admin">
              <ListItemText primary="Dashboard" />
            </NavLink>
          </ListItemButton>

          <ListItemButton sx={{ margin: "16px 0", borderRadius: "5px" }}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <NavLink to="/category">
              <ListItemText primary="Category" />
            </NavLink>
          </ListItemButton>

          <ListItemButton sx={{ margin: "16px 0", borderRadius: "5px" }}>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <NavLink to="/subcat">
              <ListItemText primary="Sub Category" />
            </NavLink>
          </ListItemButton>

          <ListItemButton sx={{ margin: "16px 0", borderRadius: "5px" }}>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <NavLink to="/qa">
              <ListItemText primary="Q & A" />
            </NavLink>
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}

export default Navbar;
