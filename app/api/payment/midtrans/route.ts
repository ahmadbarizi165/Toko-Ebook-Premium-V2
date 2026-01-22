app/api/payment/midtrans/route.ts
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import midtransClient from "midtrans-client";

export async function POST(req: Request) {
  const { orderId } = await req.json();
  await connectDB();

  const order = await Order.findById(orderId);
  if (!order) {
    return new Response("Order tidak ditemukan", { status: 404 });
  }

  const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
  });

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: order._id.toString(),
      gross_amount: order.price,
    },
    customer_details: {
      first_name: order.buyerName,
      email: order.buyerEmail,
    },
  });

  return Response.json({
    token: transaction.token,
    redirect_url: transaction.redirect_url,
  });
    }
