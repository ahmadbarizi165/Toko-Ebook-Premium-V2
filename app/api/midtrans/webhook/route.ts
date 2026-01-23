import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendEmail } from "@/utils/email";

export async function POST(req: Request) {
  const body = await req.json();

  // VALIDASI SIGNATURE
  const serverKey = process.env.MIDTRANS_WEBHOOK_SECRET!;
  const signatureKey = crypto
    .createHash("sha512")
    .update(
      body.order_id +
      body.status_code +
      body.gross_amount +
      serverKey
    )
    .digest("hex");

  if (signatureKey !== body.signature_key) {
    return new Response("Invalid signature", { status: 403 });
  }

  // HANYA PROSES JIKA SUKSES
  if (
    body.transaction_status === "settlement" ||
    body.transaction_status === "capture"
  ) {
    await connectDB();

    const token = crypto.randomBytes(32).toString("hex");

    const order = await Order.findOneAndUpdate(
      { midtransOrderId: body.order_id },
      {
        status: "PAID",
        downloadToken: token,
      },
      { new: true }
    );

    if (order) {
      const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL}/order/${order._id}`;

      await sendEmail(
        order.buyerEmail,
        "Akses Ebook Premium Anda",
        `
Halo ${order.buyerName},

Pembayaran Anda telah kami TERIMA ✅

Silakan download ebook Anda di link berikut:
${downloadLink}

Link aman & khusus untuk Anda.

Salam Berkah,
TOKO EBOOK PREMIUM
        `
      );
    }
  }

  return NextResponse.json({ received: true });
}
