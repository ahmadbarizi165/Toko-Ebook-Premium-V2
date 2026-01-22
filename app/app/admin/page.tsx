import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

async function getOrders() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return orders;
}

export default async function AdminPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-extrabold mb-8">
        📊 ADMIN PANEL — TOKO EBOOK
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-zinc-800 rounded-xl overflow-hidden">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-3 text-left">Pembeli</th>
              <th className="p-3">Ebook</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Status</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o: any) => (
              <tr
                key={o._id}
                className="border-t border-zinc-800 hover:bg-zinc-900"
              >
                <td className="p-3">
                  <div className="font-semibold">{o.buyerName}</div>
                  <div className="text-xs text-zinc-400">
                    {o.buyerEmail}
                  </div>
                </td>

                <td className="p-3 text-center">{o.bookTitle}</td>

                <td className="p-3 text-center text-emerald-400 font-bold">
                  Rp {o.price.toLocaleString("id-ID")}
                </td>

                <td className="p-3 text-center">
                  {o.status === "PAID" ? (
                    <span className="text-emerald-400 font-bold">
                      ✔ PAID
                    </span>
                  ) : (
                    <span className="text-yellow-400 font-bold">
                      ⏳ PENDING
                    </span>
                  )}
                </td>

                <td className="p-3 text-center">
                  {o.status === "PENDING" ? (
                    <form action="/api/admin/orders" method="POST">
                      <input type="hidden" name="id" value={o._id} />
                      <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-xl font-bold"
                      >
                        KONFIRMASI
                      </button>
                    </form>
                  ) : (
                    <span className="text-zinc-500 text-sm">
                      Selesai
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
