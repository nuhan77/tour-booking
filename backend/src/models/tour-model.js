import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxGroupSize: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  reviews: [
    {
      name: String,
      rating: Number,
      date: String,
      message: String,
    },
  ],
  photo: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
