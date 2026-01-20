import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Book from "@/models/Book";

export async function POST(req: Request) {
  const body = await req.json();
  const { bookId, buyerName, buyerEmail } = body;

  await connectDB();
  const book = await Book.findById(bookId);

  const order = await Order.create({
    bookId,
    bookTitle: book.title,
    price: book.price,
    buyerName,
    buyerEmail
  });

  return Response.json({ orderId: order._id });
    }
