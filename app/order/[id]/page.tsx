
// ===================================== // TAHAP D: DOWNLOAD PDF HANYA SETELAH STATUS PAID // ===================================== // Prinsip: // - Link Google Drive TIDAK tampil sebelum PAID // - Setelah admin ubah status order → PAID // - Tombol DOWNLOAD muncul

// ===================================== // UPDATE: app/order/[id]/page.tsx // ===================================== import { connectDB } from "@/lib/mongodb"; import Order from "@/models/Order"; import Book from "@/models/Book";

export default async function OrderPage({ params }: any) { await connectDB();

const order = await Order.findById(params.id); const book = await Book.findById(order.bookId);

return ( <main style={{ padding: 24 }}> <h1>Status Pesanan</h1>

<p><strong>Ebook:</strong> {order.bookTitle}</p>
  <p><strong>Harga:</strong> Rp {order.price}</p>

  <hr />

  {order.status === "PAID" ? (
    <div>
      <h3>✅ Pembayaran Diterima</h3>
      <p>Silakan download ebook Anda:</p>
      <a
        href={book.driveLink}
        target="_blank"
        style={{
          padding: 12,
          background: "green",
          color: "white",
          display: "inline-block"
        }}
      >
        DOWNLOAD PDF
      </a>
    </div>
  ) : (
    <div>
      <h3>⏳ Menunggu Pembayaran</h3>
      <p>Silakan transfer ke:</p>
      <p>SeaBank (Kode 535)</p>
      <p>Nama: AHMAD BARIZI</p>
      <p>No Rekening: 901981495649</p>
    </div>
  )}
</main>

); }

// ===================================== // CARA ADMIN KONFIRMASI (TANPA KODE) // ===================================== // 1) Buka MongoDB Atlas // 2) Collection: orders // 3) Cari order // 4) Ubah status: "PENDING" → "PAID" // 5) Save // =====================================
