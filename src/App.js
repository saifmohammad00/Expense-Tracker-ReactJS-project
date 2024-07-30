import { BrowserRouter as Router,Route, Routes} from "react-router-dom";
import SignUp from "./components/SignUp";
import Fpassword from "./components/forgetpassword/Fpassword";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path="/fp" element={<Fpassword/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
