import Midtrans from "midtrans-client";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const order = await Order.findById(body.orderId);
  if (!order) {
    return Response.json({ error: "Order tidak ditemukan" }, { status: 404 });
  }

  const snap = new Midtrans.Snap({
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
  });
}
