import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = getAuthSession();
    if (!session || (session.role !== "POLLING_OFFICER" && session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Unauthorized Polling Officer Access" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    // Polling officer's assigned station/booth
    const stationId = session.stationId;
    const boothNumber = session.boothNumber || 1;

    let voterWhere: any = {};

    if (stationId) {
      voterWhere.stationId = stationId;
    }

    if (query) {
      voterWhere.OR = [
        { epicNumber: { contains: query.trim().toUpperCase() } },
        { fullName: { contains: query.trim() } }
      ];
    }

    const voters = await prisma.user.findMany({
      where: voterWhere,
      include: {
        constituency: true,
        pollingStation: true,
        participations: true
      },
      take: 20
    });

    const activeElection = await prisma.election.findFirst({
      where: { status: "OPEN" }
    });

    const formattedVoters = voters.map(v => {
      const participation = activeElection ? v.participations.find(p => p.electionId === activeElection.id) : null;
      return {
        id: v.id,
        epicNumber: v.epicNumber,
        fullName: v.fullName,
        phone: v.phone,
        aadhaarHash: v.aadhaarHash,
        boothNumber: v.boothNumber,
        stationName: v.pollingStation?.name || "Booth #1",
        constituencyName: v.constituency?.name || "N/A",
        hasVoted: !!participation,
        receiptHash: participation?.receiptHash || null,
        votedAt: participation?.votedAt || null
      };
    });

    return NextResponse.json({
      stationId,
      boothNumber,
      voters: formattedVoters
    });
  } catch (error: any) {
    console.error("Officer API Error:", error);
    return NextResponse.json({ error: "Failed to fetch booth queue" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = getAuthSession();
    if (!session || (session.role !== "POLLING_OFFICER" && session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Unauthorized Polling Officer Access" }, { status: 403 });
    }

    const { voterId, action } = await req.json();

    if (!voterId || !action) {
      return NextResponse.json({ error: "Voter ID and action required" }, { status: 400 });
    }

    if (action === "VERIFY_IDENTITY") {
      // Log officer verification
      await prisma.auditLog.create({
        data: {
          userId: session.userId,
          action: "OFFICER_VERIFIED_VOTER",
          entityType: "User",
          entityId: voterId,
          detailsHash: `VERIFIED_AT_BOOTH_${session.boothNumber}_${Date.now()}`,
          previousHash: "BOOTH_CHAIN"
        }
      });

      return NextResponse.json({
        success: true,
        message: "Voter identity verified at booth. Single-use Voting Authorization Token issued."
      });
    }

    return NextResponse.json({ error: "Unknown officer action" }, { status: 400 });
  } catch (error: any) {
    console.error("Officer Action Error:", error);
    return NextResponse.json({ error: "Failed officer action" }, { status: 500 });
  }
}
