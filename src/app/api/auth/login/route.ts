import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/crypto";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: "EPIC Number or Email and Password required" }, { status: 400 });
    }

    const cleanIdentifier = identifier.trim();

    // Find user by EPIC number or Email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { epicNumber: { equals: cleanIdentifier } },
          { email: { equals: cleanIdentifier } }
        ]
      },
      include: {
        state: true,
        constituency: true,
        pollingStation: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid EPIC Number / Email or Password" }, { status: 401 });
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid EPIC Number / Email or Password" }, { status: 401 });
    }

    const tokenPayload = {
      userId: user.id,
      epicNumber: user.epicNumber,
      fullName: user.fullName,
      role: user.role,
      stateId: user.stateId,
      constituencyId: user.constituencyId,
      stationId: user.stationId,
      boothNumber: user.boothNumber
    };

    const token = signToken(tokenPayload);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        epicNumber: user.epicNumber,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        state: user.state?.name,
        constituency: user.constituency?.name,
        station: user.pollingStation?.name,
        boothNumber: user.boothNumber
      }
    });

    response.cookies.set("bmm_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 12 // 12 hours
    });

    return response;
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
