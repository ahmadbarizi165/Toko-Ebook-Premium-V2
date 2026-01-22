import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Book from "@/models/Book";

export async function POST(req: Request, { params }: any) {
  const { otp } = await req.json();
  await connectDB();

  const order = await Order.findOne({ downloadToken: params.token });
  if (!order || order.status !== "PAID")
    return new Response("Forbidden", { status: 403 });

  if (order.otp !== otp || order.otpExpiredAt < new Date())
    return new Response("OTP salah", { status: 403 });

  if (order.downloadCount >= 5)
    return new Response("Limit tercapai", { status: 403 });

  order.downloadCount += 1;
  await order.save();

  const book = await Book.findById(order.bookId);
  return Response.json({ link: book.driveLink });
}
