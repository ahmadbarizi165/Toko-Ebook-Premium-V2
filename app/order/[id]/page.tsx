<button
  onClick={async () => {
    const res = await fetch("/api/midtrans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order._id }),
    });
    const data = await res.json();
    window.snap.pay(data.token);
  }}
  style={{
    padding: 12,
    background: "#0ea5e9",
    color: "white",
    fontWeight: "bold",
  }}
>
  BAYAR OTOMATIS
</button>
<script
  src={
    process.env.MIDTRANS_IS_PRODUCTION === "true"
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js"
  }
  data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
/>
"use client";

import { useState } from "react";

export default function OrderPage({ params }: any) {
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  async function requestOtp() {
    const res = await fetch("/api/download/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      setMessage("✅ OTP telah dikirim ke email Anda");
    } else {
      setMessage("❌ Gagal mengirim OTP");
    }
  }

  async function download() {
    const res = await fetch(`/api/download/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    });

    const data = await res.json();

    if (res.ok) {
      setDownloadLink(data.link);
      setMessage("✅ Berhasil! Klik link di bawah");
    } else {
      setMessage("❌ OTP salah atau expired");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-zinc-900 rounded-2xl p-6 space-y-4 shadow-xl">
        <h1 className="text-2xl font-extrabold text-center">
          🔐 DOWNLOAD EBOOK
        </h1>

        <input
          placeholder="Masukkan TOKEN (dari email)"
          className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <button
          onClick={requestOtp}
          className="w-full bg-emerald-500 text-black font-bold p-3 rounded-xl"
        >
          MINTA KODE OTP
        </button>

        <input
          placeholder="Masukkan OTP"
          className="w-full p-3 rounded-xl bg-black border border-zinc-700"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={download}
          className="w-full bg-blue-500 text-black font-bold p-3 rounded-xl"
        >
          DOWNLOAD SEKARANG
        </button>

        {message && (
          <p className="text-center text-sm text-zinc-300">{message}</p>
        )}

        {downloadLink && (
          <a
            href={downloadLink}
            target="_blank"
            className="block text-center bg-green-600 p-3 rounded-xl font-bold"
          >
            ⬇ DOWNLOAD PDF
          </a>
        )}
      </div>
    </main>
  );
}
