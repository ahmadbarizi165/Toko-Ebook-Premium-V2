import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const orderId = body.order_id;
  const transactionStatus = body.transaction_status;
  const fraudStatus = body.fraud_status;

  // Status sukses Midtrans
  const isPaid =
    transactionStatus === "settlement" ||
    transactionStatus === "capture";

  if (isPaid && fraudStatus !== "deny") {
    const token = crypto.randomBytes(32).toString("hex");

    await Order.findByIdAndUpdate(orderId, {
      status: "PAID",
      downloadToken: token,
      tokenExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 hari
    });
  }

  return Response.json({ received: true });
      }
