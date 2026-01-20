import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function OrderPage({ params }: any) {
  await connectDB();
  const order = await Order.findById(params.id);

  return (
    <main style={{ padding: 24 }}>
      <h1>Instruksi Pembayaran</h1>

      <p><strong>Ebook:</strong> {order.bookTitle}</p>
      <p><strong>Harga:</strong> Rp {order.price}</p>

      <hr />

      <h3>Transfer ke:</h3>
      <p>SeaBank (Kode 535)</p>
      <p>Nama: AHMAD BARIZI</p>
      <p>No Rekening: 901981495649</p>

      <hr />

      <p>Status: <strong>{order.status}</strong></p>

      {order.status === "PAID" ? (
        <p>Silakan cek email Anda untuk link download.</p>
      ) : (
        <p>Setelah transfer, tunggu konfirmasi.</p>
      )}
    </main>
  );
      }
