import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/crypto";
import { signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Preset Demo Users for Serverless/Vercel Environment
const demoUsers = [
  {
    id: "user-super-admin",
    epicNumber: "EPIC000000",
    email: "admin@eci.gov.in",
    fullName: "Chief Election Commissioner (Super Admin)",
    role: "SUPER_ADMIN",
    password: "Pass123!",
    state: "Delhi",
    constituency: "New Delhi",
    station: "Central Headquarters",
    boothNumber: 1
  },
  {
    id: "user-admin",
    epicNumber: "EPIC000001",
    email: "officer.admin@eci.gov.in",
    fullName: "District Election Officer (Admin)",
    role: "ADMIN",
    password: "Pass123!",
    state: "Maharashtra",
    constituency: "Mumbai South",
    station: "St. Xavier High School",
    boothNumber: 1
  },
  {
    id: "user-officer-mumbai",
    epicNumber: "EPIC000002",
    email: "officer.mumbai@eci.gov.in",
    fullName: "Sanjay Deshmukh (Polling Officer)",
    role: "POLLING_OFFICER",
    password: "Pass123!",
    state: "Maharashtra",
    constituency: "Mumbai South",
    station: "St. Xavier High School",
    boothNumber: 1
  },
  {
    id: "voter-1",
    epicNumber: "EPIC100001",
    email: "voter.rajesh@demo.in",
    fullName: "Rajesh Kumar Sharma",
    role: "VOTER",
    password: "Voter123!",
    state: "Maharashtra",
    constituency: "Mumbai South",
    station: "St. Xavier High School",
    boothNumber: 1
  },
  {
    id: "voter-2",
    epicNumber: "EPIC100003",
    email: "voter.amit@demo.in",
    fullName: "Amit Patel",
    role: "VOTER",
    password: "Voter123!",
    state: "Uttar Pradesh",
    constituency: "Varanasi",
    station: "Central Hindu Boys School",
    boothNumber: 1
  }
];

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: "EPIC Number or Email and Password required" }, { status: 400 });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    // 1. Try DB lookup first if DB is available
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { epicNumber: { equals: identifier.trim().toUpperCase() } },
            { email: { equals: cleanIdentifier } }
          ]
        },
        include: {
          state: true,
          constituency: true,
          pollingStation: true
        }
      });

      if (user) {
        const isMatch = await verifyPassword(password, user.passwordHash);
        if (isMatch) {
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
            maxAge: 60 * 60 * 12
          });

          return response;
        }
      }
    } catch (dbError) {
      console.warn("DB login query failed, using serverless demo user fallback:", dbError);
    }

    // 2. Demo User Fallback for Vercel/Serverless
    const matchedDemo = demoUsers.find(
      u => (u.epicNumber.toLowerCase() === cleanIdentifier || u.email.toLowerCase() === cleanIdentifier) &&
           (password === u.password || password === "Pass123!" || password === "Voter123!")
    );

    if (matchedDemo) {
      const tokenPayload = {
        userId: matchedDemo.id,
        epicNumber: matchedDemo.epicNumber,
        fullName: matchedDemo.fullName,
        role: matchedDemo.role,
        stateId: "st-1",
        constituencyId: "c-1",
        stationId: "ps-1",
        boothNumber: matchedDemo.boothNumber
      };

      const token = signToken(tokenPayload);

      const response = NextResponse.json({
        success: true,
        user: {
          id: matchedDemo.id,
          epicNumber: matchedDemo.epicNumber,
          fullName: matchedDemo.fullName,
          email: matchedDemo.email,
          role: matchedDemo.role,
          state: matchedDemo.state,
          constituency: matchedDemo.constituency,
          station: matchedDemo.station,
          boothNumber: matchedDemo.boothNumber
        }
      });

      response.cookies.set("bmm_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 12
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid EPIC Number / Email or Password" }, { status: 401 });

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
