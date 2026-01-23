import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  if (
    body.transaction_status === "settlement" ||
    body.transaction_status === "capture"
  ) {
    const token = crypto.randomBytes(32).toString("hex");

    await Order.findByIdAndUpdate(body.order_id, {
      status: "PAID",
      downloadToken: token,
      tokenExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
  }

  return Response.json({ received: true });
      }
