import processImage from "../utils/imageProcessing.js";
import Tour from "../models/tour-model.js";
import uploadFileOnCloudinary from "../utils/cloudinary.js";
import { errorResponse, succussResponse } from "../utils/response.js";
import path from "path";
import Booking from "../models/booking-model.js";

export const addTour = async (req, res) => {
  try {
    const { title, city, address, price, maxGroupSize, desc, featured } =
      req.body;
    const file = req.file;

    if (
      !title ||
      !city ||
      !address ||
      !price ||
      !maxGroupSize ||
      !desc ||
      !file
    ) {
      return errorResponse(res, 400, "All fields are required");
    }

    const exited = await Tour.findOne({ title });
    if (exited) {
      return errorResponse(res, 400, "Tour already exists");
    }

    const outputPath = path.join("temp", `compressed-${Date.now()}.jpg`);

    await processImage(file.buffer, outputPath);

    const fileUrl = await uploadFileOnCloudinary(outputPath);

    if (!fileUrl) return errorResponse(res, 400, "Image upload failed");

    const tour = await Tour.create({
      title,
      city,
      address,
      price,
      maxGroupSize,
      desc,
      featured,
      photo: fileUrl,
    });

    return succussResponse(res, 201, "Tour added successfully");
  } catch (error) {
    console.log("adding tour");
    console.log(error);
  }
};

export const getAllTours = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 24;

    const length = await Tour.countDocuments();
    const tours = await Tour.find({}).skip(skip).limit(limit);
    return succussResponse(res, 200, "Tours fetched successfully", {
      tours,
      length,
    });
  } catch (error) {
    console.log("get all tours");
    console.log(error);
    return errorResponse(res, 400, "Tours not found");
  }
};

export const searchTours = async (req, res) => {
  try {
    const location = req.query.location;
    const price = parseInt(req.query.price) || 10000;
    const maxGroupSize = parseInt(req.query.maxGroupSize) || 100;
    const tours = await Tour.find({
      $or: [
        { city: { $regex: location, $options: "i" } },
        { title: { $regex: location, $options: "i" } },
      ],
      price: { $lte: price },
      maxGroupSize: { $lte: maxGroupSize },
    });
    return succussResponse(res, 200, "Tours fetched successfully", { tours });
  } catch (error) {
    console.log("search tour");
    console.log(error);
    return errorResponse(res, 400, "Tours not found");
  }
};

export const getSingleTOur = async (req, res) => {
  try {
    const user = req.user;
    const tour = await Tour.findById(req.params.id);
    return succussResponse(res, 200, "Tour fetched successfully", {
      tour,
      user,
    });
  } catch (error) {
    console.log("get single tour tour");
    console.log(error);
    return errorResponse(res, 400, "Tour not found");
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    return succussResponse(res, 200, "Tour deleted successfully");
  } catch (error) {
    console.log("delete tour");
    console.log(error);
    return errorResponse(res, 400, "Tour not found");
  }
};

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return succussResponse(res, 200, "Tour updated successfully", { tour });
  } catch (error) {
    console.log("update tour");
    console.log(error);
    return errorResponse(res, 400, "Tour not found");
  }
};

export const updateImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return errorResponse(res, 400, "Please select an image");
    }
    const tour = await Tour.findById(req.params.id);
    const outputPath = path.join("temp", `compressed-${Date.now()}.jpg`);
    await processImage(file.buffer, outputPath);
    const fileUrl = await uploadFileOnCloudinary(outputPath);
    if (!fileUrl) return errorResponse(res, 400, "File upload failed");
    tour.photo = fileUrl;
    await tour.save();

    return succussResponse(res, 200, "Image updated successfully", { tour });
  } catch (error) {
    console.log("update image");
    console.log(error);
    return errorResponse(res, 400, "Tour not found");
  }
};

export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true });
    return succussResponse(res, 200, "Tours fetched successfully", tours);
  } catch (error) {
    console.log("featured Tour");
    console.log(error);
    return errorResponse(res, 400, "Tours not found");
  }
};

export const addReview = async (req, res) => {
  try {
    const tourId = req.params.id;
    const user = req.user;
    const name = `${user.firstName} ${user.lastName}`;
    const { rating, comment } = req.body;

    const date = formatDate(new Date());
    const review = {
      rating,
      message: comment,
      name,
      date,
    };

    const tour = await Tour.findByIdAndUpdate(
      tourId,
      {
        $push: {
          reviews: {
            $each: [review],
            $position: 0,
          },
        },
      },
      { new: true }
    );
    if (!tour) {
      return errorResponse(res, 404, "Tour not found");
    }

    succussResponse(res, 200, "Review added successfully", { review });
  } catch (error) {
    console.log("add review");
    console.log(error);
    return errorResponse(res, 500, "Server error");
  }
};

export const bookTour = async (req, res) => {
  try {
    const user = req.user;
    const booking = await Booking.create({ ...req.body, user: user._id });
    return succussResponse(res, 200, "Tour booked successfully", { booking });
  } catch (error) {
    console.log("book tour");
    console.log(error);
    return errorResponse(res, 500, "Server error");
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("tour").populate("user");
    return succussResponse(res, 200, "Bookings fetched successfully", {
      bookings,
    });
  } catch (error) {
    console.log("get all bookings");
    console.log(error);
    return errorResponse(res, 500, "Server error");
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return succussResponse(res, 200, "Booking status updated successfully", {
      booking,
    });
  } catch (error) {
    console.log("update booking status");
    console.log(error);
    return errorResponse(res, 500, "Server error");
  }
};

// date in format

const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
