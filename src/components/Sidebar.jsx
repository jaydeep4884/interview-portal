import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { MdSpaceDashboard } from "react-icons/md";

function Sidebar() {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          minHeight: "64px",
          backgroundColor: "#1976d2",
          color: "white",
          padding: "0 24px",
          alignContent: "center",
          borderRight: "1px solid rgba(236, 236, 236, 0.12)",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            // borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          Interview Portal
        </Typography>
      </Box>

      {/* Sidebar Items */}
      <Box
        sx={{
          padding: "0 16px",
          maxWidth: "210px",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <List>
          <ListItemButton
            sx={{
              backgroundColor: "#1976d2",
              margin: "8px 0",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
              borderRadius: "5px",
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <MdSpaceDashboard style={{ height: "24px", width: "24px" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton sx={{ margin: "8px 0", borderRadius: "5px" }}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItemButton>

          <ListItemButton sx={{ margin: "8px 0", borderRadius: "5px" }}>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Sub Category" />
          </ListItemButton>

          <ListItemButton sx={{ margin: "8px 0", borderRadius: "5px" }}>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Q & A" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
