import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../adminScreen/login";
import Signup from "../adminScreen/signup";
import Home from "../adminScreen/home";
import Dashboard from "../adminScreen/dashboard";



// import Protected from "../adminScreen/protected";
// import DashboardPage from "../screen/admin page/admindashboard";
// import Courselist from "../screen/courselist";
// import InstituteDashboard from "../screen/institute page/institutedashboard";

export default function AppRouter() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="institutelist" element={<Institutelist />} /> */}
          {/* <Route path="courselist" element={<Courselist />} /> */}
          {/* <Route path="courseform" element={<Courseform />} /> */}
          {/* <Route path="institutedashboard/*" element={<InstituteDashboard />} /> */}
          {/* <Route path="/*" element={<Protected Screen={DashboardPage} />} /> */}
        </Routes>
      </Router>
    </>
  );
}
