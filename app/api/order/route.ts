import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Book from "@/models/Book";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const book = await Book.findById(body.bookId);

  const order = await Order.create({
    bookId: book._id,
    bookTitle: book.title,
    price: book.price,
    buyerName: body.name,
    buyerEmail: body.email,
  });

  return Response.json({ orderId: order._id });
}
