import Image from "next/image";
import Link from "next/link";

async function getBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-12">
      
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="mx-auto mb-4"
          draggable={false}
        />

        <h1 className="text-4xl font-bold tracking-tight">
          TOKO EBOOK PREMIUM
        </h1>

        <p className="mt-4 text-zinc-300 text-lg">
          Ilmu pengembangan diri spiritual tingkat tinggi.  
          <span className="text-yellow-400 font-semibold">
            {" "}Bukan bacaan biasa.
          </span>
        </p>
      </div>

      {/* KATALOG */}
      <section className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {books.map((book: any) => (
          <div
            key={book._id}
            className="bg-zinc-900 rounded-2xl p-5 shadow-xl border border-zinc-800 hover:border-yellow-500 transition"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* COVER */}
            <div className="relative w-full h-[320px] mb-4">
              <Image
                src={book.cover || "/covers/default.jpg"}
                alt={book.title}
                fill
                className="object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* TITLE */}
            <h2 className="text-xl font-semibold mb-2">
              {book.title}
            </h2>

            {/* COPYWRITING */}
            <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
              {book.description}
            </p>

            {/* PRICE */}
            <div className="text-yellow-400 text-2xl font-bold mb-4">
              Rp {book.price.toLocaleString("id-ID")}
            </div>

            {/* CTA */}
            <Link
              href={`/order/${book._id}`}
              className="block text-center bg-yellow-500 text-black font-semibold py-3 rounded-xl hover:bg-yellow-400 transition"
            >
              BUKA AKSES PREMIUM
            </Link>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="mt-24 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} Toko Ebook Premium — Hak Cipta Dilindungi
      </footer>
    </main>
  );
}
