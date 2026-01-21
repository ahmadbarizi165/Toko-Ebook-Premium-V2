import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Book from "@/models/Book";
import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const order = await Order.findById(params.id);
  if (!order || order.status !== "PAID") {
    return new Response("Akses ditolak", { status: 403 });
  }

  const book = await Book.findById(order.bookId);
  if (!book) {
    return new Response("File tidak ditemukan", { status: 404 });
  }

  redirect(book.driveLink);
}
