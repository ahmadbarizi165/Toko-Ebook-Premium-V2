"use client";

import { useEffect, useState } from "react";

type Book = {
  _id: string;
  title: string;
  description: string;
  price: number;
  cover: string;
  isPremium: boolean;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        📘 Toko Ebook Premium
      </h1>
      <p style={{ marginBottom: 24 }}>
        Koleksi ebook premium pengembangan diri & spiritual.
      </p>

      {loading && <p>Memuat katalog...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h3>{book.title}</h3>
            <p style={{ fontSize: 14 }}>{book.description}</p>
            <p>
              <strong>Rp {book.price}</strong>
            </p>

            {book.isPremium && (
              <span
                style={{
                  fontSize: 12,
                  color: "white",
                  background: "goldenrod",
                  padding: "4px 8px",
                  borderRadius: 4,
                }}
              >
                PREMIUM
              </span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
