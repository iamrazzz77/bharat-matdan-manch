import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = getAuthSession();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        state: true,
        constituency: {
          include: {
            district: true
          }
        },
        pollingStation: true,
        participations: {
          include: {
            election: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    // Check open elections
    const activeElection = await prisma.election.findFirst({
      where: { status: "OPEN" }
    });

    let hasVotedInActive = false;
    let userReceiptHash: string | null = null;
    let votedAt: Date | null = null;

    if (activeElection) {
      const participation = user.participations.find(p => p.electionId === activeElection.id);
      if (participation) {
        hasVotedInActive = true;
        userReceiptHash = participation.receiptHash;
        votedAt = participation.votedAt;
      }
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        epicNumber: user.epicNumber,
        aadhaarHash: user.aadhaarHash,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
        role: user.role,
        state: user.state,
        constituency: user.constituency,
        pollingStation: user.pollingStation,
        boothNumber: user.boothNumber,
        activeElection: activeElection ? {
          id: activeElection.id,
          title: activeElection.title,
          status: activeElection.status,
          hasVoted: hasVotedInActive,
          receiptHash: userReceiptHash,
          votedAt: votedAt
        } : null
      }
    });
  } catch (error: any) {
    console.error("Auth Me Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
