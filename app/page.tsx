import Link from "next/link";

async function getBooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main style={{ padding: 24 }}>
      <h1>📚 Toko Ebook Premium</h1>

      {books.length === 0 && <p>Belum ada ebook.</p>}

      <div style={{ display: "grid", gap: 16 }}>
        {books.map((book: any) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ccc",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <h3>{book.title}</h3>
            <p>Rp {book.price}</p>
            <Link href={`/book/${book._id}`}>Lihat Detail</Link>
          </div>
        ))}
      </div>
    </main>
  );
                }
