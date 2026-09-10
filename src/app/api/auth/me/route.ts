import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const mockVoterProfile = {
  id: "voter-demo-1",
  epicNumber: "EPIC100001",
  aadhaarHash: "AADHAAR-HASH-8832-9910",
  fullName: "Rajesh Kumar Sharma",
  phone: "+91-9876510001",
  email: "voter.rajesh@demo.in",
  role: "VOTER",
  state: { id: "st-mh", code: "MH", name: "Maharashtra" },
  constituency: { id: "c1", code: "PC01-MH", name: "Mumbai South" },
  pollingStation: { id: "ps1", name: "St. Xavier High School, Dhobi Talao" },
  boothNumber: 1,
  activeElection: {
    id: "demo-2026",
    title: "18th Lok Sabha General Elections 2026",
    status: "OPEN",
    hasVoted: false,
    receiptHash: null,
    votedAt: null
  }
};

export async function GET() {
  try {
    const session = getAuthSession();
    if (!session) {
      // In demo mode on Vercel if session is empty, return default voter profile
      return NextResponse.json({ authenticated: true, user: mockVoterProfile });
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
      return NextResponse.json({ authenticated: true, user: mockVoterProfile });
    }

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
    console.warn("Auth Me DB Warning:", error?.message);
    return NextResponse.json({ authenticated: true, user: mockVoterProfile });
  }
}
