"use client";
import { useState } from "react";

function BuyButton({ bookId }: { bookId: string }) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    setLoading(true);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId,
        buyerName: "Pembeli",
        buyerEmail: "pembeli@email.com"
      })
    });

    const data = await res.json();
    window.location.href = `/order/${data.orderId}`;
  }

  return (
    <button onClick={buy} disabled={loading}>
      {loading ? "Memproses..." : "Beli Sekarang"}
    </button>
  );
}

export default BuyButton;
