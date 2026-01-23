import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";

export async function POST(req: Request) {
  const body = await req.json();

  const snap = new Midtrans.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
  });

  const orderId = "ORDER-" + Date.now();

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: body.price,
    },
    customer_details: {
      first_name: body.name || "Pembeli Ebook",
      email: body.email || "email@ebookpremium.id",
    },
    item_details: [
      {
        id: body.id,
        price: body.price,
        quantity: 1,
        name: body.title,
      },
    ],
  };

  const transaction = await snap.createTransaction(parameter);

  return NextResponse.json({
    token: transaction.token,
  });
}
