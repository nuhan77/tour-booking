import { Router } from "express";
import {
  getBookingInfo,
  getUserInfo,
  loginUser,
  registerUser,
} from "../controllers/user-controller.js";
import checkAuth, { tryAuth } from "../middlewares/auth-middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.get("/details", checkAuth, getUserInfo);
userRouter.post("/login", loginUser);
userRouter.get("/bookings", checkAuth, getBookingInfo);

export default userRouter;
