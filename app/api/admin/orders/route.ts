// ===================================== // TAHAP G: PROTEKSI ADMIN + KEAMANAN DASAR // ===================================== // Tujuan: // - Halaman /admin tidak bisa dibuka sembarang orang // - Hanya admin yang tahu SECRET KEY // - Tetap GRATIS (tanpa login ribet)

// STRATEGI PALING AMAN & SEDERHANA: // 👉 Proteksi dengan ADMIN_SECRET_KEY (ENV)

// ===================================== // 1. TAMBAH ENV DI VERCEL // ===================================== // KEY   : ADMIN_SECRET_KEY // VALUE : bebas, contoh: barizi-admin-123

// WAJIB aktif di: // - Production // - Preview // - Development

// ===================================== // 2. UPDATE API ADMIN (WAJIB) // FILE: app/api/admin/orders/route.ts // ===================================== import { connectDB } from "@/lib/mongodb"; import Order from "@/models/Order";

function checkAdmin(req: Request) { const secret = req.headers.get("x-admin-key"); return secret === process.env.ADMIN_SECRET_KEY; }

export async function GET(req: Request) { if (!checkAdmin(req)) { return Response.json({ error: "Unauthorized" }, { status: 401 }); }

await connectDB(); const orders = await Order.find().sort({ createdAt: -1 }); return Response.json(orders); }

export async function PUT(req: Request) { if (!checkAdmin(req)) { return Response.json({ error: "Unauthorized" }, { status: 401 }); }

const { id } = await req.json(); await connectDB();

await Order.findByIdAndUpdate(id, { status: "PAID" }); return Response.json({ success: true }); }

// ===================================== // 3. UPDATE HALAMAN ADMIN // FILE: app/admin/page.tsx // ===================================== "use client";

import { useEffect, useState } from "react";

export default function AdminPage() { const [orders, setOrders] = useState<any[]>([]); const [key, setKey] = useState(""); const [authorized, setAuthorized] = useState(false);

async function loadOrders() { const res = await fetch("/api/admin/orders", { headers: { "x-admin-key": key }, });

if (res.status === 401) {
  alert("Kunci admin salah");
  return;
}

const data = await res.json();
setOrders(data);
setAuthorized(true);

}

async function markPaid(id: string) { await fetch("/api/admin/orders", { method: "PUT", headers: { "Content-Type": "application/json", "x-admin-key": key, }, body: JSON.stringify({ id }), });

loadOrders();

}

if (!authorized) { return ( <main style={{ padding: 24 }}> <h1>🔐 Admin Login</h1> <input placeholder="Masukkan Admin Key" value={key} onChange={(e) => setKey(e.target.value)} style={{ padding: 10, width: "100%" }} /> <button onClick={loadOrders} style={{ marginTop: 12, padding: 10 }} > Masuk Admin </button> </main> ); }

return ( <main style={{ padding: 24 }}> <h1>🛠️ Admin Order (Aman)</h1>

{orders.map((order) => (
    <div
      key={order._id}
      style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12 }}
    >
      <p><strong>{order.bookTitle}</strong></p>
      <p>{order.buyerName}</p>
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

// ===================================== // HASIL AKHIR // ===================================== // - /admin minta kunci // - Salah kunci ❌ tidak bisa akses // - Benar kunci ✅ admin aman // - Tanpa login ribet // - GRATIS // =====================================
