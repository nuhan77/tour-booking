import { Navigate, Route, Routes } from "react-router-dom";
import Tours from "../pages/Tours";
import AddTour from "../pages/admin/AddTour";
import EditTourDetails from "../pages/admin/EditTourDetails";

function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<Navigate to="/admin/edit-tours" />}>
        <Route path="edit-tours" element={<Tours />} />
        <Route path="add-tour" element={<AddTour />} />
        <Route path="update-tour/:id" element={<EditTourDetails />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;
