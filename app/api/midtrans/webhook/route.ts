MIDTRANS_WEBHOOK_SECRET=YOUR_SERVER_KEY
EMAIL_USER=xxxx@gmail.com
EMAIL_PASS=xxxx
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import crypto from "crypto";
import { sendEmail } from "@/utils/email";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const orderId = body.order_id;
  const transactionStatus = body.transaction_status;
  const fraudStatus = body.fraud_status;

  const isPaid =
    transactionStatus === "settlement" ||
    transactionStatus === "capture";

  if (isPaid && fraudStatus !== "deny") {
    const token = crypto.randomBytes(32).toString("hex");

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "PAID",
        downloadToken: token,
        tokenExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
      { new: true }
    );

    // ⬇️ KIRIM EMAIL OTOMATIS
    if (order) {
      const orderLink = `${process.env.NEXT_PUBLIC_BASE_URL}/order/${order._id}`;

      await sendEmail(
        order.buyerEmail,
        "✅ Pembayaran Berhasil – Akses Ebook Anda",
        `
        <h2>Pembayaran Berhasil</h2>
        <p>Halo <b>${order.buyerName}</b>,</p>
        <p>Pembayaran ebook <b>${order.bookTitle}</b> telah kami terima.</p>
        <p>Silakan klik link di bawah untuk mengakses ebook Anda:</p>
        <p>
          <a href="${orderLink}" style="padding:10px 16px;background:#16a34a;color:white;text-decoration:none;">
            📥 BUKA HALAMAN DOWNLOAD
          </a>
        </p>
        <p>Terima kasih atas kepercayaan Anda.</p>
        <hr/>
        <small>Toko Ebook Premium</small>
        `
      );
    }
  }

  return Response.json({ received: true });
}
