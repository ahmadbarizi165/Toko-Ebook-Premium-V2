import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export default async function Home() {
  await connectDB();
  const books = await Book.find();

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      
      {/* HEADER */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          TOKO EBOOK PREMIUM
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Pengetahuan tingkat tinggi • Proteksi spiritual • Kesadaran diri  
          <br />Akses privat & aman
        </p>
      </section>

      {/* GRID BUKU */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book: any) => (
          <div key={book._id} className="premium-card overflow-hidden">
            
            {/* COVER */}
            <div className="relative h-64">
              <Image
                src={book.cover || "/cover-default.jpg"}
                alt={book.title}
                fill
                className="object-cover"
              />
              {book.isPremium && (
                <div className="absolute top-4 right-4 badge-premium">
                  PREMIUM
                </div>
              )}
            </div>

            {/* KONTEN */}
            <div className="p-6 flex flex-col gap-4">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-slate-400 text-sm line-clamp-3">
                {book.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-indigo-400">
                  Rp {book.price.toLocaleString("id-ID")}
                </span>

                <Link href={`/order/${book._id}`} className="premium-button">
                  BELI SEKARANG
                </Link>
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* TRUST */}
      <section className="mt-20 text-center text-slate-400 text-sm">
        🔒 Akses privat • 📧 Ebook via Email • ♾️ Hak pribadi
      </section>

    </main>
  );
}
