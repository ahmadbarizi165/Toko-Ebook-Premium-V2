import nodemailer from "nodemailer";

export async function sendEmailOrderPaid(
  to: string,
  name: string,
  bookTitle: string,
  orderId: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <div style="font-family:Arial; background:#0f172a; color:#e5e7eb; padding:24px">
    <div style="max-width:600px; margin:auto; background:#020617; border-radius:16px; padding:24px">
      <h1 style="color:#22c55e; text-align:center">
        PEMBAYARAN BERHASIL ✅
      </h1>

      <p>Assalamu’alaikum <strong>${name}</strong>,</p>

      <p>
        Terima kasih telah membeli ebook premium:
      </p>

      <h2 style="color:#38bdf8">${bookTitle}</h2>

      <p>
        Pesanan Anda telah <strong>DIKONFIRMASI</strong>.
      </p>

      <div style="background:#020617; border:1px solid #1e293b; padding:16px; border-radius:12px">
        <p><strong>🔐 Link Download Aman:</strong></p>
        <a
          href="${process.env.BASE_URL}/order/${orderId}"
          style="display:inline-block; margin-top:12px; background:#22c55e; color:black; padding:12px 18px; border-radius:12px; text-decoration:none; font-weight:bold"
        >
          BUKA HALAMAN DOWNLOAD
        </a>
      </div>

      <p style="margin-top:20px">
        Demi keamanan, file dilindungi dengan:
        <ul>
          <li>Token unik</li>
          <li>OTP via email</li>
          <li>Batas download</li>
        </ul>
      </p>

      <p>
        Semoga ebook ini menjadi <strong>jalan perubahan dan peningkatan kualitas hidup Anda</strong>.
      </p>

      <p style="margin-top:24px">
        Salam hangat,<br/>
        <strong>AHMAD BARIZI</strong><br/>
        <em>Toko Ebook Premium</em>
      </p>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"Toko Ebook Premium" <${process.env.EMAIL_USER}>`,
    to,
    subject: "✅ Ebook Premium Anda Siap Diunduh",
    html,
  });
}
