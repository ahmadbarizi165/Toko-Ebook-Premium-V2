 import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req: Request) {
  const { id } = await req.json();
  await connectDB();

  const token = crypto.randomBytes(32).toString("hex");

  await Order.findByIdAndUpdate(id, {
    status: "PAID",
    downloadToken: token,
    tokenExpiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return Response.json({ success: true });
}
