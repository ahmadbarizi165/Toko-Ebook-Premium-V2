import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";
import BuyButton from "@/components/BuyButton";

export default async function BookPage({ params }: any) {
  await connectDB();
  const book = await Book.findById(params.id);

  return (
    <main style={{ padding: 24 }}>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <h3>Rp {book.price}</h3>

      <BuyButton bookId={book._id.toString()} />
    </main>
  );
}
