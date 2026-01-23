import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  await connectDB();

  const order = await Order.findOne({
    downloadToken: params.token,
    status: "PAID",
  });

  if (!order) {
    return new Response("Link tidak valid", { status: 403 });
  }

  // BATASI JUMLAH DOWNLOAD
  if (order.downloadCount >= 3) {
    return new Response("Batas download tercapai", { status: 403 });
  }

  order.downloadCount += 1;
  await order.save();

  const book = await Book.findById(order.bookId);

  // REDIRECT ke Google Drive
  return NextResponse.redirect(book.driveLink);
}
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Book from "@/models/Book";

export async function POST(req: Request, { params }: any) {
  await connectDB();

  const body = await req.json();
  const otp = body.otp;

  const order = await Order.findOne({ downloadToken: params.token });

  if (!order || order.status !== "PAID") {
    return new Response("Akses ditolak", { status: 403 });
  }

  // ⏳ CEK OTP
  if (order.otp !== otp || order.otpExpiredAt < new Date()) {
    return new Response("OTP salah atau expired", { status: 403 });
  }

  // 🌐 AMBIL IP & DEVICE
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = req.headers.get("user-agent") || "unknown";

  // 🔒 KUNCI PERTAMA KALI
  if (!order.ipAddress && !order.userAgent) {
    order.ipAddress = ip;
    order.userAgent = userAgent;
  } else {
    // ❌ JIKA BEDA DEVICE / IP
    if (order.ipAddress !== ip || order.userAgent !== userAgent) {
      return new Response(
        "Link hanya bisa digunakan di perangkat pertama",
        { status: 403 }
      );
    }
  }

  // ⛔ BATAS DOWNLOAD
  if (order.downloadCount >= 5) {
    return new Response("Batas download tercapai", { status: 403 });
  }

  order.downloadCount += 1;
  await order.save();

  const book = await Book.findById(order.bookId);

  return Response.json({
    link: book.driveLink,
  });
}
