import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthStatus } from "./reduxStore/auth/authSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import SelectRole from "./components/user/SelectRole";
import Hero from "./components/Hero";
import VolunteerHome from "./components/user/roles/VolunteerHome";
import DonorHome from "./components/user/roles/DonorHome";
import NgoHome from "./components/user/roles/NgoHome";
import VolunteerStatus from "./components/user/roles/volunteer/VolunteerStatus";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAuthStatus());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (location.pathname === "/") {
        switch (user.role) {
          case "volunteer":
            navigate("/volunteer");
            break;
          case "donor":
            navigate("/donor");
            break;
          case "ngo":
            navigate("/ngo");
            break;
          default:
            navigate("/");
        }
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/selectrole" element={<SelectRole />} />
        <Route path="/volunteer" element={<VolunteerHome />} />
        <Route path="/donor" element={<DonorHome />} />
        <Route path="/ngo" element={<NgoHome />} />
        <Route path="/status" element={<VolunteerStatus/>} />
      </Routes>
      <Footer />
    </>
  );
}
