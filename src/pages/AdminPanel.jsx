import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
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
import Category from "./Category";
import Qanswer from "./Qanswer";
import SubCat from "./SubCat";
import Admin from "./admin";

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
      {" "}
      {/* Wrap with ThemeProvider */}
      <CssBaseline />
      {/* Header (App Bar) */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Toolpad
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Sidebar (Drawer) */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 60,
            transition: "width 0.3s",
            top: "64px", // Below header
            height: "calc(100% - 64px)", // Remaining height
            overflowX: "hidden",
          },
        }}
      >
        <List>
          {NAVIGATION.map((item) => (
            <ListItemButton key={item.path} component={NavLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.title} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          marginTop: "64px",
          marginLeft: open ? "240px" : "60px",
          transition: "margin 0.3s",
          padding: 3,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/category" element={<Category />} />
          <Route path="/subcat" element={<SubCat />} />
          <Route path="/qa" element={<Qanswer />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
