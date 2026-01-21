import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    default: "Spiritual",
  },

  coverImage: {
    type: String,
    default: "",
  },

  driveLink: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Book ||
  mongoose.model("Book", BookSchema);
