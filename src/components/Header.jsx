import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  ListItem,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/Menu";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
const drawerWidth = 240;

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Category", icon: <CategoryIcon />, path: "/Category" },
  { text: "Sub Category", icon: <AddCircleOutlineIcon />, path: "/Subcat" },
  { text: "Q & A", icon: <HelpOutlineIcon />, path: "/Q-A" },
];

export default function Header({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const drawer = (
    <div>
      <List style={{ paddingTop: "0", marginLeft: "0" }}>
        <ListItem sx={{ backgroundColor: "#2F3C7E", padding: "14px" }}>
          <ListItemText>
            <Typography sx={{ color: "white", fontSize: "20px" }}>
              Interview Panel
            </Typography>
          </ListItemText>
        </ListItem>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#2F3C7E",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard {location.pathname}
          </Typography>
          <Link to="/" onClick={handleLogout}>
            <MeetingRoomIcon sx={{ color: "white" }} />
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "16px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
