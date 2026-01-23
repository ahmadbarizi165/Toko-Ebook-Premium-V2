import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  orderLink: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <div style="font-family: Arial; max-width:600px; margin:auto; line-height:1.6">
    <h2 style="color:#111">Terima kasih atas pembelian Anda</h2>
    <p>
      Akses ebook Premium Anda sudah aktif.
    </p>

    <div style="margin:30px 0; text-align:center">
      <a href="${orderLink}"
         style="background:#facc15;color:#000;padding:14px 26px;
                text-decoration:none;font-weight:bold;border-radius:8px;">
        BUKA AKSES EBOOK
      </a>
    </div>

    <p style="font-size:13px;color:#666">
      Link ini bersifat pribadi. Jangan dibagikan ke orang lain.
    </p>

    <hr />

    <p style="font-size:12px;color:#999">
      © ${new Date().getFullYear()} Toko Ebook Premium
    </p>
  </div>
  `;

  await transporter.sendMail({
    from: "Toko Ebook Premium",
    to,
    subject,
    html,
  });
}
