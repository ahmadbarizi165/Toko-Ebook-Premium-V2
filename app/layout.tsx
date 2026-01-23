<script
  src="https://app.sandbox.midtrans.com/snap/snap.js"
  data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
/>
<script
  src="https://app.sandbox.midtrans.com/snap/snap.js"
  data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
/>
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ebook Premium – Kesadaran & Realitas",
  description:
    "Ebook Premium eksklusif untuk pengembangan kesadaran, perlindungan spiritual, dan realitas tingkat tinggi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        onContextMenu={(e) => e.preventDefault()} // 🔒 Anti klik kanan global
        style={{
          margin: 0,
          padding: 0,
          background: "linear-gradient(180deg,#020617,#020617,#0f172a)",
          color: "#e5e7eb",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen",
        }}
      >
        {/* ===== HEADER ===== */}
        <header
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(2,6,23,0.85)",
            backdropFilter: "blur(10px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 20,
              color: "#facc15",
              letterSpacing: 1,
            }}
          >
            📘 EBOOK PREMIUM
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            Akses Kesadaran • Perlindungan • Realitas Tinggi
          </p>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main
          style={{
            minHeight: "80vh",
            padding: "32px 20px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {children}
        </main>

        {/* ===== FOOTER ===== */}
        <footer
          style={{
            padding: 24,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            textAlign: "center",
            color: "#64748b",
            fontSize: 12,
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Ebook Premium — Ahmad Barizi
          </p>
          <p style={{ margin: 4 }}>
            Produk digital • Akses instan • Pembayaran otomatis
          </p>
        </footer>
      </body>
    </html>
  );
        }
