// ===================================== // HOMEPAGE PREMIUM + FILTER EBOOK (NEXT.JS APP ROUTER) // ===================================== // Fitur: // - Tampilan premium // - Menampilkan ebook dari /api/books // - Filter (semua / termurah / termahal) // - Tombol BELI SEKARANG

'use client';

import { useEffect, useState } from 'react'; import BuyButton from '@/components/BuyButton';

export default function HomePage() { const [books, setBooks] = useState<any[]>([]); const [filter, setFilter] = useState('all');

useEffect(() => { fetch('/api/books') .then(res => res.json()) .then(data => setBooks(data)); }, []);

const filteredBooks = [...books].sort((a, b) => { if (filter === 'cheap') return a.price - b.price; if (filter === 'expensive') return b.price - a.price; return 0; });

return ( <main style={{ padding: 32, fontFamily: 'sans-serif' }}> <h1 style={{ fontSize: 32, marginBottom: 8 }}> 📘 TOKO EBOOK PREMIUM </h1> <p style={{ color: '#666', marginBottom: 24 }}> Pengembangan Diri & Spiritual (Premium) </p>

<div style={{ marginBottom: 24 }}>
    <select
      value={filter}
      onChange={e => setFilter(e.target.value)}
    >
      <option value="all">Semua Ebook</option>
      <option value="cheap">Harga Termurah</option>
      <option value="expensive">Harga Termahal</option>
    </select>
  </div>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 20,
    }}
  >
    {filteredBooks.map(book => (
      <div
        key={book._id}
        style={{
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 20,
          background: '#fff',
        }}
      >
        <h3>{book.title}</h3>
        <p style={{ fontSize: 14, color: '#555' }}>
          {book.description || 'Ebook Premium Spiritual'}
        </p>
        <p style={{ fontWeight: 'bold', marginTop: 8 }}>
          Rp {book.price}
        </p>

        <BuyButton bookId={book._id} />
      </div>
    ))}
  </div>
</main>

); }
