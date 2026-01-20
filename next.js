// ================================ // STRUKTUR FOLDER // ================================ // app/ // api/books/route.ts // page.tsx // layout.tsx // lib/mongodb.ts // models/Book.ts // package.json (default dari create-next-app) // ================================

// ================================ // lib/mongodb.ts // ================================ import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) { throw new Error("MONGODB_URI belum diset di Environment Variables"); }

let cached = (global as any).mongoose;

if (!cached) { cached = (global as any).mongoose = { conn: null, promise: null }; }

export async function connectDB() { if (cached.conn) return cached.conn; if (!cached.promise) { cached.promise = mongoose.connect(MONGODB_URI); } cached.conn = await cached.promise; return cached.conn; }

// ================================ // models/Book.ts // ================================ import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({ title: { type: String, required: true }, price: { type: Number, required: true }, description: { type: String }, cover: { type: String }, driveLink: { type: String }, });

export default mongoose.models.Book || mongoose.model("Book", BookSchema);

// ================================ // app/api/books/route.ts // ================================ import { connectDB } from "@/lib/mongodb"; import Book from "@/models/Book";

export async function GET() { await connectDB(); const books = await Book.find(); return Response.json(books); }

// ================================ // app/layout.tsx // ================================ export default function RootLayout({ children }: { children: React.ReactNode }) { return ( 

<body style={{ fontFamily: "sans-serif", margin: 0 }}>{children} ); } 

// ================================ // app/page.tsx // ================================

