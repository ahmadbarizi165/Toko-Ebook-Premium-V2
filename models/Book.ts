import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String, // dari Cloudinary (opsional)
  },
  driveLink: {
    type: String, // Google Drive PDF
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Book ||
  mongoose.model("Book", BookSchema);
