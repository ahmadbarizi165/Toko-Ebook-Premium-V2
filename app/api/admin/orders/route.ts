import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req: Request) {
  const { id, secret } = await req.json();

  // 🔐 CEK ADMIN SECRET
  if (secret !== process.env.ADMIN_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();

  const token = crypto.randomBytes(32).toString("hex");

  await Order.findByIdAndUpdate(id, {
    status: "PAID",
    downloadToken: token,
    tokenExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  return Response.json({
    success: true,
    message: "Order berhasil dikonfirmasi PAID",
  });
}
