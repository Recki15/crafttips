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
import { Post } from "./Pages/Post";
import { AdminDecide } from "./Pages/Admin/AdminDecide";
import ProfileManage  from "./Pages/ProfileManage";
import ProfileEditor  from "./Pages/ProfileEditor";
import {Admin} from "./Pages/Admin/Admin";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/'  element={<><Home /></>} />
                <Route path='/logout' element={<Logout />} />
                <Route path="/Contact" element={<><LoggedInNavbar /><ContactUs /></>} />
                <Route path="/add" element={<><LoggedInNavbar /> <Add /></>} />
                <Route path="/admin" element={<> <Admin /></>} />
                <Route path='/Login' element={<><LandingNavBar /> <Login /></>} />
                <Route path='/Register' element={<><LandingNavBar /> <Register /></>} />
                <Route path='/Dashboard' element={<><Navbar /> <Dashboard /> </>} />
                <Route path='/ProfileManage' element={<><LoggedInNavbar /> <ProfileManage /> </>} />
                <Route path='/admindecide/posts/:ids' element={<Post />} />
                <Route path='/admindecide' element={<AdminDecide />} />
                <Route path='/ProfileManage/edit' element={<><LoggedInNavbar /> <ProfileEditor /> </>} />
            </Routes>
        </Router>

    );
}

export default App;