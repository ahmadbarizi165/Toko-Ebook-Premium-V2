import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  cover: String,
  driveLink: String,
  isPremium: Boolean,
});

export default mongoose.models.Book ||
  mongoose.model("Book", BookSchema);
