 import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET() {
  try {
    await connectDB();

    const books = await Book.find().sort({ createdAt: -1 });

    return Response.json(books);
  } catch (error) {
    return Response.json(
      { message: "Gagal mengambil data ebook" },
      { status: 500 }
    );
  }
}
