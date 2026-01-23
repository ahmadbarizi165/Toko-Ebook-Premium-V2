import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const orderId = "ORDER-" + Date.now();

  await Order.create({
    midtransOrderId: orderId,
    bookTitle: body.title,
    price: body.price,
    buyerEmail: body.email,
    buyerName: body.name,
    status: "PENDING",
  });

  const snap = new Midtrans.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
  });

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: body.price,
    },
    customer_details: {
      first_name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json({ token: transaction.token });
}
