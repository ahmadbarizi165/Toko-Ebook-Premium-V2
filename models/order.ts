import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({ bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" }, bookTitle: String, price: Number, buyerName: String, buyerEmail: String, status: { type: String, default: "PENDING" }, // PENDING | PAID downloadToken: { type: String }, createdAt: { type: Date, default: Date.now }, });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
