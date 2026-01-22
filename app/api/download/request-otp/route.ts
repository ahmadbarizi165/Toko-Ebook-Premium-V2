import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendEmail } from "@/utils/email";

export async function POST(req: Request) {
  const { token } = await req.json();
  await connectDB();

  const order = await Order.findOne({ downloadToken: token });
  if (!order) return new Response("Invalid", { status: 403 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  order.otp = otp;
  order.otpExpiredAt = new Date(Date.now() + 5 * 60 * 1000);
  await order.save();

  await sendEmail(
    order.buyerEmail,
    "Kode OTP Download Ebook",
    `Kode OTP Anda: ${otp}`
  );

  return Response.json({ sent: true });
}
