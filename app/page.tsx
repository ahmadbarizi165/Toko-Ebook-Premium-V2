import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 960, margin: "auto", padding: 24 }}>
      {/* HERO */}
      <section style={{ textAlign: "center", marginBottom: 60 }}>
        <h1 style={{ fontSize: 36, fontWeight: "bold" }}>
          Toko Ebook Premium
        </h1>
        <p style={{ fontSize: 18, marginTop: 12 }}>
          Karya Pengembangan Diri Spiritual Modern • Eksklusif • Terbukti
        </p>
        <p style={{ marginTop: 16, color: "#555" }}>
          Bukan bacaan biasa. Ini adalah <b>jalan transformasi</b>.
        </p>
      </section>

      {/* TRUST */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
        <div>✔ Akses Instan</div>
        <div>✔ Pembayaran Otomatis</div>
        <div>✔ Aman & Privasi Terjaga</div>
        <div>✔ File Asli & Eksklusif</div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", marginTop: 60 }}>
        <Link href="#katalog">
          <button style={{
            padding: "14px 28px",
            background: "#111",
            color: "white",
            fontSize: 16,
            borderRadius: 6
          }}>
            🔓 BUKA KATALOG PREMIUM
          </button>
        </Link>
      </section>
    </main>
  );
}
