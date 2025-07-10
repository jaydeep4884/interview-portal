import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import SubCat from "./pages/SubCat";
import Qanswer from "./pages/Qanswer";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route
            path="dashboard"
            element={
              <Header>
                <Dashboard />
              </Header>
            }
          />
          <Route
            path="category"
            element={
              <Header>
                <Category />
              </Header>
            }
          />
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route
            path="Subcat"
            element={
              <Header>
                <SubCat />
              </Header>
            }
          />
          <Route
            path="Q-A"
            element={
              <Header>
                <Qanswer />
              </Header>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
