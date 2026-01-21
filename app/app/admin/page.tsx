// ===================================== // TAHAP F: SISTEM ADMIN SEDERHANA (GRATIS) // ===================================== // Fitur: // 1) Lihat semua order // 2) Lihat status (PENDING / PAID) // 3) Admin ubah status jadi PAID // Catatan: TANPA login dulu (aman untuk tahap belajar)

// ===================================== // FILE: app/admin/page.tsx // ===================================== "use client";

import { useEffect, useState } from "react";

export default function AdminPage() { const [orders, setOrders] = useState<any[]>([]);

async function loadOrders() { const res = await fetch("/api/admin/orders"); const data = await res.json(); setOrders(data); }

async function markPaid(id: string) { await fetch("/api/admin/orders", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }), }); loadOrders(); }

useEffect(() => { loadOrders(); }, []);

return ( <main style={{ padding: 24 }}> <h1>🛠️ Admin Order</h1>

{orders.map((order) => (
    <div
      key={order._id}
      style={{
        border: "1px solid #ccc",
        padding: 16,
        marginBottom: 12,
      }}
    >
      <p><strong>{order.bookTitle}</strong></p>
      <p>Nama: {order.buyerName}</p>
      <p>Email: {order.buyerEmail}</p>
      <p>Status: <strong>{order.status}</strong></p>

      {order.status === "PENDING" && (
        <button
          onClick={() => markPaid(order._id)}
          style={{ padding: 8, background: "green", color: "white" }}
        >
          Tandai PAID
        </button>
      )}
    </div>
  ))}
</main>

); }

// ===================================== // FILE: app/api/admin/orders/route.ts // ===================================== import { connectDB } from "@/lib/mongodb"; import Order from "@/models/Order";

export async function GET() { await connectDB(); const orders = await Order.find().sort({ createdAt: -1 }); return Response.json(orders); }

export async function PUT(req: Request) { const { id } = await req.json(); await connectDB();

await Order.findByIdAndUpdate(id, { status: "PAID" }); return Response.json({ success: true }); }

// ===================================== // CARA PAKAI ADMIN // ===================================== // 1) Buka: https://DOMAIN-ANDA/admin // 2) Lihat order masuk // 3) Setelah transfer masuk → klik "Tandai PAID" // 4) Pembeli otomatis bisa download // =====================================
