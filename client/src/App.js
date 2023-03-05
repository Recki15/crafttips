import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { Login } from "./Components/Login";
import { Navbar } from "./Components/Navbar";
import { Register } from "./Components/Register";
import { Home } from "./Pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/'  element={<Home />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Dashboard' element={<><Navbar /> <Dashboard /> </>} />
            </Routes>
        </Router>
    );
}

export default App;