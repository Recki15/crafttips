import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import LandingNavBar from "./Components/LandingNavbar";
import LoggedInNavbar from "./Components/LoggedInNavbar";
import { Login } from "./Components/Login";
import { Logout } from "./Components/Logout";
import { Navbar } from "./Components/Navbar";
import { Register } from "./Components/Register";
import { Add } from "./Pages/Add";
import { ContactUs } from "./Pages/ContactUs";
import { Home } from "./Pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/'  element={<><Home /></>} />
                <Route path='/logout' element={<Logout />} />
                <Route path="/Contact" element={<><LoggedInNavbar /><ContactUs /></>} />
                <Route path="/add" element={<><LoggedInNavbar /> <Add /></>} />
                <Route path='/Login' element={<><LandingNavBar /> <Login /></>} />
                <Route path='/Register' element={<><LandingNavBar /> <Register /></>} />
                <Route path='/Dashboard' element={<><Navbar /> <Dashboard /> </>} />
            </Routes>
        </Router>
    );
}

export default App;