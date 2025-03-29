import * as React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Category from "./Category";
// import Login from "./Login";
import Qanswer from "./Qanswer";
import SubCat from "./SubCat";
import Admin from "./admin";
import { NavLink } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

const NAVIGATION = [
  { path: "/admin", title: "Dashboard", icon: <DashboardIcon /> },
  { path: "/category", title: "Category", icon: <CategoryIcon /> },
  { path: "/subcat", title: "Sub Category", icon: <AddCircleOutlineIcon /> },
  { path: "/qa", title: "Q & A", icon: <HelpOutlineIcon /> },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function NavigationMenu() {
  return (
    <nav>
      {NAVIGATION.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end // Ensures exact match
          style={({ isActive }) => ({
            textDecoration: "none",
            margin: "10px",
            display: "block",
            color: isActive ? "blue" : "black", // Highlight active link
          })}
        >
          {item.icon} {item.title}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AdminPanel(props) {
  const { window } = props;
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />{" "}
          {/* Redirect */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/category" element={<Category />} />
          <Route path="/subcat" element={<SubCat />} />
          <Route path="/qa" element={<Qanswer />} />
        </Routes>
        <PageContainer>
          <Grid container spacing={1}></Grid> {/* Empty Grid for layout */}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
