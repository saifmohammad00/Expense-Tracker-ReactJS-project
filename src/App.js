import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Fpassword from "./components/forgetpassword/Fpassword";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import { Fragment } from "react";
import { useSelector } from "react-redux";


function App() {
  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
  return (
    <Fragment>
      <Router>
        <Header />
        {isAuthenticated && <Welcome/>}
        <Routes>
          {!isAuthenticated && <Route path="/" element={<SignUp />} />}
          <Route path="/fp" element={<Fpassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
