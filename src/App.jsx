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
import VolunteerUpdates from "./components/roles/volunteer/VolunteerUpdates";
import BioHome from "./components/roles/biogas/BioHome";
import BioDashboard from "./components/roles/biogas/BioDashboard";

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
        <Route path="/biogas" element={<BioHome />} />
        <Route path="/biodash" element={<BioDashboard />} />
        <Route path="/donationHistory" element={<AllUpdatesPage />} />
        <Route path="/volunteerUpdates" element={<VolunteerUpdates />} />
      </Routes>
      <Footer />
    </>
  );
}
