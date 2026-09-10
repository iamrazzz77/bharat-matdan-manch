import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/crypto";

export async function POST(req: Request) {
  try {
    const { epicNumber, fullName, phone, email, password, stateId, constituencyId, aadhaarNumber } = await req.json();

    if (!epicNumber || !fullName || !phone || !email || !password || !constituencyId) {
      return NextResponse.json({ error: "All mandatory voter registration fields are required" }, { status: 400 });
    }

    const cleanEpic = epicNumber.trim().toUpperCase();

    // Check existing EPIC or Email
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { epicNumber: cleanEpic },
          { email: email.trim().toLowerCase() }
        ]
      }
    });

    if (existing) {
      return NextResponse.json({ error: "Voter with this EPIC Number or Email already registered" }, { status: 400 });
    }

    const passHash = await hashPassword(password);
    const mockAadhaarHash = aadhaarNumber ? `AADHAAR-HASH-${aadhaarNumber.slice(-4)}` : `AADHAAR-HASH-${Math.floor(1000 + Math.random() * 9000)}`;

    // Pick first station in constituency
    const station = await prisma.pollingStation.findFirst({
      where: { constituencyId }
    });

    const newUser = await prisma.user.create({
      data: {
        epicNumber: cleanEpic,
        aadhaarHash: mockAadhaarHash,
        fullName,
        phone,
        email: email.trim().toLowerCase(),
        passwordHash: passHash,
        role: "VOTER",
        stateId: stateId || null,
        constituencyId: constituencyId,
        stationId: station ? station.id : null,
        boothNumber: 1
      }
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        epicNumber: newUser.epicNumber,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Failed to register voter" }, { status: 500 });
  }
}
