import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma"; // adjust import to your path

export async function POST( req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { startDate, endDate, location, guests } = body;

  try {
    const booking = await prisma.booking.create({
    data: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      guests,
      userId: session.user?.id,
    },
  });

  return NextResponse.json(booking);
  } catch (error) {
    
  }

}