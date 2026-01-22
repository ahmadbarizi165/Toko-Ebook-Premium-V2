import Image from "next/image";

async function getBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-10">
      {/* HEADER */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4">
          📘 TOKO EBOOK PREMIUM
        </h1>
        <p className="text-zinc-300 max-w-2xl mx-auto text-lg">
          Kumpulan Ebook Pilihan dengan Kualitas Tinggi, Ilmu Mendalam,
          dan Proteksi Eksklusif.
        </p>
      </section>

      {/* LIST BUKU */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {books.map((book: any) => (
          <div
            key={book._id}
            className="bg-zinc-900 rounded-2xl shadow-xl hover:scale-105 transition duration-300 border border-zinc-800"
          >
            {/* COVER */}
            <div className="relative w-full h-[320px] rounded-t-2xl overflow-hidden">
              <Image
                src={book.cover || "/cover-default.jpg"}
                alt={book.title}
                fill
                className="object-contain"
              />
            </div>

            {/* INFO */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{book.title}</h2>
              <p className="text-sm text-zinc-400 mb-4">
                {book.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-emerald-400">
                  Rp {book.price.toLocaleString("id-ID")}
                </span>

                <a
                  href={`/order/${book._id}`}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-xl font-bold transition"
                >
                  BELI SEKARANG
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="text-center text-zinc-500 text-sm mt-20">
        © {new Date().getFullYear()} TOKO EBOOK PREMIUM — All Rights Reserved
      </footer>
    </main>
  );
}
