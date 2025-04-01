import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  CssBaseline,
  Box,
  AppBar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/Menu";
import DoorBackIcon from "@mui/icons-material/DoorBack";

import Category from "./Category";
import Qanswer from "./Qanswer";
import SubCat from "./SubCat";
import Admin from "./admin";
import Login from "./Login";

const NAVIGATION = [
  { path: "/admin", title: "Dashboard", icon: <DashboardIcon /> },
  { path: "/category", title: "Category", icon: <CategoryIcon /> },
  { path: "/subcat", title: "Sub Category", icon: <AddCircleOutlineIcon /> },
  { path: "/qa", title: "Q & A", icon: <HelpOutlineIcon /> },
];

// Create theme with palette for light/dark modes
const demoTheme = createTheme({
  palette: {
    mode: "light", // or "dark"
  },
});

export default function AdminPanel(props) {
  const [open, setOpen] = React.useState(true); // Sidebar open by default

  // Toggle Sidebar when clicking collapse menu
  const toggleDrawer = () => setOpen(!open);

  return (
    <ThemeProvider theme={demoTheme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Interview Portal
            </Typography>
          </Box>

          <Box>
            <IconButton aria-label="delete" size="large">
              <NavLink to="/">
                <DoorBackIcon fontSize="inherit" sx={{ color: "white" }} />
              </NavLink>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 0,
            transition: "width 0.3s",
            top: "64px", // Below header
            height: "calc(100% - 64px)", // Remaining height
            overflowX: "hidden",
          },
        }}
      >
        <List sx={{ padding: "8px 16px" }}>
          {NAVIGATION.map((item) => (
            <ListItemButton
              sx={{
                margin: "16px 0",
                borderRadius: 1,
                "&.active": { backgroundColor: "#1976D2", color: "white" },
              }}
              key={item.path}
              component={NavLink}
              to={item.path}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.title} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content + Routing */}
      <Box
        component="main"
        sx={{
          marginTop: "64px",
          marginLeft: open ? "240px" : "0px",
          transition: "margin 0.3s",
          padding: "20px 0",
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/category" element={<Category />} />
          <Route path="/subcat" element={<SubCat />} />
          <Route path="/qa" element={<Qanswer />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
