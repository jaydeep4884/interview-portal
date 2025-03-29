import "./App.css";
// import Category from "./pages/Category";
// import Login from "./pages/Login";
// import Qanswer from "./pages/Qanswer";
// import SubCat from "./pages/SubCat";
// import Admin from "./pages/admin";
// import { Routes, Route } from "react-router";
import AdminPanel from "./pages/AdminPanel";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="admin" element={<Admin />} />
          <Route path="category" element={<Category />} />
          <Route path="subcat" element={<SubCat />} />
          <Route path="qa" element={<Qanswer />} />
        </Route>
      </Routes> */}
      <Router>
        <AdminPanel />
      </Router>
      {/* <AdminPanel /> */}
    </>
  );
}

export default App;
