import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import TermsAndConditions from "../pages/TermsAndConditions";
import NotFound from "../pages/NotFound";
import AddTour from "../pages/admin/AddTour";
import Unauthorized from "../pages/Unauthorized";
import EditTourDetails from "../pages/admin/EditTourDetails";
import Gallery from "../pages/Gallery";
import Bookings from "../pages/Bookings";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/admin/" element={<Navigate to="/admin/add-tour" />} />
      <Route path="/admin/add-tour" element={<AddTour />} />
      <Route path="/admin/edit-tour" element={<Tours edit />} />
      <Route path="/admin/update-tour/:id" element={<EditTourDetails />} />
    </Routes>
  );
}

export default Router;  
