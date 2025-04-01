import Booking from "../models/booking-model.js";
import User from "../models/user-model.js";
import { errorResponse, succussResponse } from "../utils/response.js";
import Cookies from "js-cookie";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log(firstName, lastName, email, password);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User already exists", existingUser);
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const userRes = await User.findOne({ email: email }).select("-password");

    const token = await user.generateToken();

    Cookies.set("token", token);

    return succussResponse(res, 200, "User registered successfully", {
      user: userRes,
      token,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "can't register user, Please try again");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return errorResponse(res, 400, "User not found");
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return errorResponse(res, 400, "Invalid password");
    }

    const token = await user.generateToken();
    Cookies.set("token", token);

    const userRes = await User.findOne({ email: email }).select("-password");

    return succussResponse(res, 200, "User logged in successfully", {
      user: userRes,
      token,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "can't login user, Please try again");
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    return succussResponse(res, 200, "User info fetched successfully", {
      user,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 400, "can't get user info, Please try again");
  }
};

export const getBookingInfo = async (req, res) => {
  try {
    const user = req.user;
    const bookings = await Booking.find({ user: user._id }).populate("tour");
    return succussResponse(res, 200, "User info fetched successfully", {
      bookings,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 400, "can't get user info, Please try again");
  }
};

