import { BrowserRouter as Router,Route, Routes, Navigate} from "react-router-dom";
import SignUp from "./components/SignUp";
import Fpassword from "./components/forgetpassword/Fpassword";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/fp" element={<Fpassword/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
