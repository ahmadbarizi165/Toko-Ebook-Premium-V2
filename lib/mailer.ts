import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendEmail } from "@/lib/mailer";

export async function PUT(req: Request) {
  const { id } = await req.json();
  await connectDB();

  const order = await Order.findByIdAndUpdate(
    id,
    { status: "PAID" },
    { new: true }
  );

  const orderLink = `${process.env.NEXT_PUBLIC_BASE_URL}/order/${order._id}`;

  await sendEmail(
    order.buyerEmail,
    "Ebook Anda Siap Didownload",
    `
      <h2>Terima kasih sudah membeli ebook premium</h2>
      <p>Silakan klik link di bawah untuk download ebook Anda:</p>
      <a href="${orderLink}">${orderLink}</a>
      <p>Salam,<br/>Toko Ebook Premium</p>
    `
  );
import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `Toko Ebook Premium <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
