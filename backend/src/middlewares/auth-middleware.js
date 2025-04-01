import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { errorResponse } from "../utils/response.js";

const checkAuth = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      errorResponse(res, 401, "Unauthorized");
    }

    const tokenSecret = process.env.TOKEN_SECRET;

    const isAuthenticated = await jwt.verify(token, tokenSecret);

    if (!isAuthenticated) {
      errorResponse(res, 401, "Unauthorized");
    }
    const user = await User.findById(isAuthenticated._id).select("-password");
    if (!user) {
      errorResponse(res, 401, "Unauthorized");
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("auth error");
    console.log(error);
    return errorResponse(res, 401, "Unauthorized");
  }
};

export default checkAuth;

export const tryAuth = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      next();
    }

    const tokenSecret = process.env.TOKEN_SECRET;

    const isAuthenticated = await jwt.verify(token, tokenSecret);

    if (!isAuthenticated) {
      next();
    }
    const user = await User.findById(isAuthenticated._id).select("-password");
    if (!user) {
      next();
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    next();
    console.log("first");
  }
};
