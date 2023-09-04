import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import FixedContent from "./components/FixedContent";
import Menu from "./pages/Menu";
import Error from "./pages/Error";
import AuthorizedUser from "./components/AuthorizedUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route element={<AuthorizedUser />}>
            <Route element={<FixedContent />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="menu" element={<Menu />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit="3" />
    </>
  );
}

export default App;
