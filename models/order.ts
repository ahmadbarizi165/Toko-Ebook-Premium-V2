import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  bookTitle: String,
  price: Number,
  buyerName: String,
  buyerEmail: String,

  status: { type: String, default: "PENDING" },

  downloadToken: String,
  tokenExpiredAt: Date,

  otp: String,
  otpExpiredAt: Date,

  downloadCount: { type: Number, default: 0 },

  ipAddress: String,
  userAgent: String,

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
