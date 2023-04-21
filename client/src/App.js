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
import SearchPage from "./Pages/Search";
import { Faqq } from "./Pages/Faq";
import { Feed } from "./Pages/Feed";
import { Footer } from "./Components/Footer";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='*'  element={<><GeneralPageNotFound /><Footer/></>} />
                <Route path='/'  element={<><Home /><Footer/></>} />
                <Route path='/feed' element={<><Feed /><Footer/></>} />
                <Route path='/posts/:ids'  element={<><Posts /><Footer/></>} />
                <Route path='/editpost/:ids' element={<><LoggedInNavbar /> <Edit /><Footer/></>} />
                <Route path='/logout' element={<Logout />} />
                <Route path="/contactus" element={<><ContactUs /><Footer/></>} />
                <Route path="/add" element={<><LoggedInNavbar /> <Add /><Footer/></>} />
                <Route path="/search" element={<><SearchPage /><Footer/></>} />
                <Route path="/Faq" element={<> <Faqq /><Footer></Footer></>} />
                <Route path="/admin" element={<><LoggedInNavbar /> <Admin /><Footer/></>} />
                <Route path='/login' element={<><LandingNavBar /> <Login /><Footer/></>} />
                <Route path='/register' element={<><LandingNavBar /> <Register /><Footer/></>} />
                <Route path='/admin/Dashboard' element={<><LoggedInNavbar /> <Dashboard />  <Footer/></>} />
                <Route path='/profileManage' element={<><LoggedInNavbar /> <ProfileManage /> <Footer/></>} />
                <Route path='/admin/admindecide/posts/:ids' element={<><LoggedInNavbar /> <AdminPostChecker />  <Footer/> </>} />
                <Route path='/admin/admindecide' element={<><LoggedInNavbar /> <AdminDecide />  <Footer/></>} />
                <Route path='/profileManage/edit' element={<><LoggedInNavbar /> <ProfileEditor /> <Footer/></>} />
                <Route path='/profile/:ids' element={<><Profile /> <Footer/></>} />
            </Routes>
        </Router>

    );
}

export default App;