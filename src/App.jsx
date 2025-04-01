import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/admin";
import Category from "./pages/Category";
import SubCat from "./pages/SubCat";
import Qanswer from "./pages/Qanswer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route
            path="admin"
            element={
              <Header>
                <Admin />
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
          <Route
            path="subcat"
            element={
              <Header>
                <SubCat />
              </Header>
            }
          />
          <Route
            path="qa"
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
