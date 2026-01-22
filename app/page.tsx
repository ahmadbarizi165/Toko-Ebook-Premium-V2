"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then(res => res.json())
      .then(setBooks);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-4">
        📘 TOKO EBOOK PREMIUM
      </h1>

      <p className="text-center text-zinc-400 mb-10">
        Ebook Pengembangan Diri & Spiritual • Aman • Eksklusif
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {books.map(book => (
          <div
            key={book._id}
            className="bg-zinc-900 rounded-2xl p-5 shadow-xl"
          >
            <img
              src={book.cover || "/covers/default.jpg"}
              className="rounded-xl mb-4"
            />

            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-zinc-400 text-sm mb-3">
              {book.description}
            </p>

            <p className="text-green-400 font-bold mb-4">
              Rp {book.price.toLocaleString("id-ID")}
            </p>

            <button
              onClick={async () => {
                const res = await fetch("/api/order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    bookId: book._id,
                    name: "Pembeli",
                    email: prompt("Masukkan email Anda"),
                  }),
                });

                const data = await res.json();
                window.location.href = `/order/${data.orderId}`;
              }}
              className="w-full bg-emerald-500 text-black p-3 rounded-xl font-bold"
            >
              BELI SEKARANG
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
