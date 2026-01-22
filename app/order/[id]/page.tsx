import Image from "next/image";

async function getBook(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`,
    { cache: "no-store" }
  );
  const books = await res.json();
  return books.find((b: any) => b._id === id);
}

export default async function OrderPage({ params }: any) {
  const book = await getBook(params.id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Buku tidak ditemukan
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* COVER */}
        <div className="flex justify-center">
          <div className="relative w-[260px] h-[360px] shadow-2xl">
            <Image
              src={book.cover || "/cover-default.jpg"}
              alt={book.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* FORM */}
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-xl">
          <h1 className="text-3xl font-extrabold mb-3">
            {book.title}
          </h1>

          <p className="text-zinc-400 mb-6">
            {book.description}
          </p>

          <div className="text-2xl font-bold text-emerald-400 mb-8">
            Rp {book.price.toLocaleString("id-ID")}
          </div>

          <form
            action="/api/order"
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="bookId" value={book._id} />

            <div>
              <label className="block mb-1 text-sm text-zinc-300">
                Nama Lengkap
              </label>
              <input
                name="name"
                required
                placeholder="Masukkan nama Anda"
                className="w-full p-3 rounded-xl bg-black border border-zinc-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-zinc-300">
                Email Aktif
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Email untuk menerima akses ebook"
                className="w-full p-3 rounded-xl bg-black border border-zinc-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-xl transition"
            >
              🔐 LANJUTKAN PEMBELIAN
            </button>
          </form>

          <p className="text-xs text-zinc-500 mt-6 text-center">
            ✔ Akses aman & terlindungi  
            <br />
            ✔ Download menggunakan OTP Email
          </p>
        </div>
      </div>
    </main>
  );
}
