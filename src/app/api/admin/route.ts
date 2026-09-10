import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = getAuthSession();
    if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN" && session.role !== "AUDITOR")) {
      return NextResponse.json({ error: "Unauthorized Admin Access" }, { status: 403 });
    }

    const elections = await prisma.election.findMany({
      orderBy: { createdAt: "desc" }
    });

    const parties = await prisma.party.findMany({
      include: {
        candidates: true
      }
    });

    const candidates = await prisma.candidate.findMany({
      include: {
        party: true,
        constituency: true
      }
    });

    const auditLogs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50
    });

    const totalVoters = await prisma.user.count({ where: { role: "VOTER" } });
    const totalVotesCast = await prisma.anonymousVote.count();
    const totalParticipations = await prisma.voterParticipation.count();

    const isReconciliationPassed = totalVotesCast === totalParticipations;

    return NextResponse.json({
      elections,
      parties,
      candidates,
      auditLogs,
      metrics: {
        totalVoters,
        totalVotesCast,
        totalParticipations,
        isReconciliationPassed
      }
    });
  } catch (error: any) {
    console.error("Admin Fetch Error:", error);
    return NextResponse.json({ error: "Failed to load admin data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = getAuthSession();
    if (!session || (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Unauthorized Admin Action" }, { status: 403 });
    }

    const body = await req.json();
    const { action } = body;

    if (action === "UPDATE_ELECTION_STATUS") {
      const { electionId, status } = body;
      const updated = await prisma.election.update({
        where: { id: electionId },
        data: { status }
      });

      await prisma.auditLog.create({
        data: {
          userId: session.userId,
          action: `ELECTION_STATUS_CHANGE_${status}`,
          entityType: "Election",
          entityId: electionId,
          detailsHash: `STATUS_CHANGED_TO_${status}`,
          previousHash: "ADMIN_ACTION"
        }
      });

      return NextResponse.json({ success: true, election: updated });
    }

    if (action === "CREATE_CANDIDATE") {
      const { electionId, constituencyId, partyId, fullName, fullNameHi } = body;
      const candidate = await prisma.candidate.create({
        data: {
          electionId,
          constituencyId,
          partyId: partyId || null,
          fullName,
          fullNameHi: fullNameHi || fullName,
          ballotOrder: 1
        }
      });
      return NextResponse.json({ success: true, candidate });
    }

    return NextResponse.json({ error: "Invalid admin action" }, { status: 400 });
  } catch (error: any) {
    console.error("Admin Action Error:", error);
    return NextResponse.json({ error: "Failed admin action" }, { status: 500 });
  }
}
