import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAuthStatus } from "./reduxStore/auth/authSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import DonorHome from "./components/roles/DonorHome";
import VolunteerHome from "./components/roles/VolunteerHome";
import NgoHome from "./components/roles/NgoHome";
import AllUpdatesPage from "./components/roles/donor/AllUpdatesPage";
import Selectrole from "./components/auth/SelectRole";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthStatus());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/selectrole" element={<Selectrole />} />
        <Route path="/volunteer" element={<VolunteerHome />} />
        <Route path="/donor" element={<DonorHome />} />
        <Route path="/ngo" element={<NgoHome />} />
        <Route path="/donationHistory" element={<AllUpdatesPage />} />
      </Routes>
      <Footer />
    </>
  );
}
