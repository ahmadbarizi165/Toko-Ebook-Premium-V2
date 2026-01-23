import { sendEmail } from "@/utils/email";

const orderLink = `${process.env.NEXT_PUBLIC_BASE_URL}/order/${id}`;

await sendEmail(
  order.buyerEmail,
  "Akses Ebook Premium Anda",
  orderLink
); di 
import crypto from "crypto";

const token = crypto.randomBytes(32).toString("hex");

await Order.findByIdAndUpdate(id, {
  status: "PAID",
  downloadToken: token,
});
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Book from "@/models/Book";
import crypto from "crypto";
import { sendEmailOrderPaid } from "@/utils/email";

export async function POST(req: Request) {
  const { id, secret } = await req.json();

  if (secret !== process.env.ADMIN_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();

  const order = await Order.findById(id);
  if (!order) {
    return new Response("Order tidak ditemukan", { status: 404 });
  }

  const token = crypto.randomBytes(32).toString("hex");

  order.status = "PAID";
  order.downloadToken = token;
  order.tokenExpiredAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  await order.save();

  const book = await Book.findById(order.bookId);

  // 📧 KIRIM EMAIL PREMIUM
  await sendEmailOrderPaid(
    order.buyerEmail,
    order.buyerName,
    book.title,
    order._id.toString()
  );

  return Response.json({
    success: true,
    message: "Order PAID & email terkirim",
  });
}
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
