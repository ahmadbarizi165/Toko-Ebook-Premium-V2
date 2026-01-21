import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const filter = category ? { category } : {};

    const books = await Book.find(filter).sort({ createdAt: -1 });

    return Response.json(books);
  } catch (error) {
    return Response.json(
      { error: "Gagal mengambil data ebook" },
      { status: 500 }
    );
  }
}
