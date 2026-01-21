"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [category, setCategory] = useState("ALL");

  async function loadBooks(cat: string) {
    const url =
      cat === "ALL"
        ? "/api/books"
        : `/api/books?category=${cat}`;

    const res = await fetch(url);
    const data = await res.json();
    setBooks(data);
  }

  useEffect(() => {
    loadBooks(category);
  }, [category]);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>
        📚 Toko Ebook Premium
      </h1>

      {/* FILTER */}
      <div style={{ marginBottom: 24 }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10, width: "100%" }}
        >
          <option value="ALL">Semua Ebook</option>
          <option value="Spiritual">Spiritual</option>
          <option value="Pengembangan Diri">
            Pengembangan Diri
          </option>
        </select>
      </div>

      {/* LIST BOOK */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 16,
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{book.title}</h3>
            <p style={{ fontSize: 14, color: "#555" }}>
              {book.description}
            </p>
            <strong>Rp {book.price}</strong>
            <br />
            <Link href={`/book/${book._id}`}>
              <button
                style={{
                  marginTop: 12,
                  padding: 10,
                  width: "100%",
                  background: "black",
                  color: "white",
                  borderRadius: 8,
                }}
              >
                Lihat Detail
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
