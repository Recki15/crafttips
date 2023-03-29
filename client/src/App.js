import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Admin/Dashboard";
import LandingNavBar from "./Components/LandingNavbar";
import LoggedInNavbar from "./Components/LoggedInNavbar";
import { Login } from "./Components/Login";
import { Logout } from "./Components/Logout";
import { Register } from "./Components/Register";
import { Add } from "./Pages/Add";
import { ContactUs } from "./Pages/ContactUs";
import { Home } from "./Pages/Home";
import { AdminPostChecker } from "./Pages/Admin/AdminPostChecker";
import { AdminDecide } from "./Pages/Admin/AdminDecide";
import ProfileManage  from "./Pages/ProfileManage";
import ProfileEditor  from "./Pages/ProfileEditor";
import Profile  from "./Pages/Profile";
import {Admin} from "./Pages/Admin/Admin";
import { Posts } from "./Pages/Posts";
import { GeneralPageNotFound } from "./Pages/GeneralPageNotFound";
import { Edit } from "./Pages/Edit";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='*'  element={<><GeneralPageNotFound /></>} />
                <Route path='/'  element={<><Home /></>} />
                <Route path='/posts/:ids'  element={<><Posts /></>} />
                <Route path='/editpost/:ids' element={<><LoggedInNavbar /> <Edit /></>} />
                <Route path='/logout' element={<Logout />} />
                <Route path="/contactus" element={<><LoggedInNavbar /><ContactUs /></>} />
                <Route path="/add" element={<><LoggedInNavbar /> <Add /></>} />
                <Route path="/admin" element={<><LoggedInNavbar /> <Admin /></>} />
                <Route path='/login' element={<><LandingNavBar /> <Login /></>} />
                <Route path='/register' element={<><LandingNavBar /> <Register /></>} />
                <Route path='/admin/Dashboard' element={<><LoggedInNavbar /> <Dashboard /> </>} />
                <Route path='/profileManage' element={<><LoggedInNavbar /> <ProfileManage /> </>} />
                <Route path='/admin/admindecide/posts/:ids' element={<><LoggedInNavbar /> <AdminPostChecker /> </>} />
                <Route path='/admin/admindecide' element={<><LoggedInNavbar /> <AdminDecide /> </>} />
                <Route path='/profileManage/edit' element={<><LoggedInNavbar /> <ProfileEditor /> </>} />
                <Route path='/profile/:ids' element={<><LoggedInNavbar /> <Profile /> </>} />
            </Routes>
        </Router>

    );
}

export default App;