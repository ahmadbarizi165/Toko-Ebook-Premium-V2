import { connectDB } from "@/lib/mongodb"; import Order from "@/models/Order"; import Book from "@/models/Book";

export async function GET( req: Request, { params }: { params: { token: string } } ) { await connectDB();

const order = await Order.findOne({ downloadToken: params.token });

if (!order || order.status !== "PAID") { return new Response("Link tidak valid", { status: 403 }); }

const book = await Book.findById(order.bookId);

return Response.redirect(book.driveLink); }
