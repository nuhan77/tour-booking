import { Router } from "express";
import {
  addReview,
  addTour,
  bookTour,
  deleteTour,
  getAllBookings,
  getAllTours,
  getFeaturedTours,
  getSingleTOur,
  searchTours,
  updateBookingStatus,
  updateImage,
  updateTour,
} from "../controllers/tour-controller.js";
import { upload } from "../middlewares/multer-middleware.js";
import checkAuth, { tryAuth } from "../middlewares/auth-middleware.js";


const tourRouter = Router();

tourRouter.post("/admin/add-tours", checkAuth, upload.single("image"), addTour);

tourRouter.put(
  "/admin/update-image/:id",
  checkAuth,
  upload.single("image"),
  updateImage
);

tourRouter.get("/featured", getFeaturedTours);
tourRouter.get("/search", searchTours);
tourRouter.delete("/admin/delete/:id", checkAuth, deleteTour);
tourRouter.put("/admin/update/:id", checkAuth, updateTour);
tourRouter.get("/", getAllTours);
tourRouter.post("/:id/add-review", checkAuth, addReview);
tourRouter.get("/bookings", checkAuth,getAllBookings);
tourRouter.patch("/bookings/update/:id", checkAuth,updateBookingStatus); 
tourRouter.get("/:id", tryAuth, getSingleTOur);
tourRouter.post("/book", checkAuth,bookTour);
tourRouter.delete("/:id", checkAuth, deleteTour);

export default tourRouter;
