"use client";

export default function Home() {
  async function bayar() {
    const res = await fetch("/api/midtrans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "ebook-001",
        title: "MEMBONGKAR REALITAS HOLOGRAM",
        price: 299000,
      }),
    });

    const data = await res.json();

    // @ts-ignore
    window.snap.pay(data.token);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "#facc15" }}>
        MEMBONGKAR REALITAS HOLOGRAM
      </h2>
      <p>Rp 299.000 — Akses Seumur Hidup</p>

      <button
        onClick={bayar}
        style={{
          padding: "12px 24px",
          background: "linear-gradient(90deg,#facc15,#fde047)",
          border: "none",
          borderRadius: 8,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🔐 BELI SEKARANG
      </button>
    </div>
  );
}
