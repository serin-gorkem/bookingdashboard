// app/api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

type Body = {
  email?: string;
  password?: string;
  name?: string;
};

export async function POST(request: Request) {
  try {
    const body: Body = await request.json();

    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const name = body.name?.trim() || null;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    // Prevent duplicate
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    console.error("REGISTER_ERROR", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}