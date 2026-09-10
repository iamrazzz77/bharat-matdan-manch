import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateVoteReceipt, computeAuditHash, sha256 } from "@/lib/crypto";

export async function POST(req: Request) {
  try {
    const session = getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please login to vote." }, { status: 401 });
    }

    const { electionId, candidateId, pollingType } = await req.json();

    if (!electionId) {
      return NextResponse.json({ error: "Election ID is required" }, { status: 400 });
    }

    // Fetch User
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { constituency: true }
    });

    if (!user || !user.constituencyId) {
      return NextResponse.json({ error: "Voter profile or constituency not found" }, { status: 400 });
    }

    // Check Election Status
    const election = await prisma.election.findUnique({
      where: { id: electionId }
    });

    if (!election || election.status !== "OPEN") {
      return NextResponse.json({ error: "Voting is not currently OPEN for this election." }, { status: 400 });
    }

    // DOUBLE VOTE PREVENTION CHECK
    const existingParticipation = await prisma.voterParticipation.findUnique({
      where: {
        voterId_electionId: {
          voterId: user.id,
          electionId: election.id
        }
      }
    });

    if (existingParticipation) {
      return NextResponse.json({
        error: "DOUBLE VOTE PREVENTED: You have already cast your ballot in this election.",
        receiptHash: existingParticipation.receiptHash,
        votedAt: existingParticipation.votedAt
      }, { status: 400 });
    }

    // Verify candidate belongs to constituency (if candidateId provided, else NOTA)
    let selectedCandidateName = "NONE OF THE ABOVE (NOTA)";
    if (candidateId) {
      const candidate = await prisma.candidate.findUnique({
        where: { id: candidateId }
      });
      if (!candidate || candidate.constituencyId !== user.constituencyId) {
        return NextResponse.json({ error: "Invalid candidate for your constituency" }, { status: 400 });
      }
      selectedCandidateName = candidate.fullName;
    }

    const timestamp = Date.now();
    const receiptHash = generateVoteReceipt(user.id, election.id, timestamp);

    // Fetch previous audit log for tamper-evident chain
    const lastAudit = await prisma.auditLog.findFirst({
      orderBy: { createdAt: "desc" }
    });
    const previousHash = lastAudit ? lastAudit.detailsHash : "GENESIS_HASH_000000000000000000000000";
    const auditHash = computeAuditHash(previousHash, "VOTE_CAST", election.id, receiptHash);

    // DATABASE TRANSACTION: Secret Ballot Separation
    await prisma.$transaction([
      // 1. Voter Participation Record (Marks voter as VOTED)
      prisma.voterParticipation.create({
        data: {
          voterId: user.id,
          electionId: election.id,
          receiptHash: receiptHash,
          pollingType: pollingType || "ONLINE",
          ipOrBoothHash: "SECURE_BALLOT_CLIENT"
        }
      }),

      // 2. Anonymous Ballot Storage (NO voterId link!)
      prisma.anonymousVote.create({
        data: {
          electionId: election.id,
          constituencyId: user.constituencyId,
          candidateId: candidateId || null,
          hashReceipt: receiptHash,
          tamperCheckHash: sha256(receiptHash + election.id)
        }
      }),

      // 3. Tamper-Evident Audit Log Entry
      prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "VOTE_CAST_ANONYMOUS",
          entityType: "AnonymousVote",
          entityId: election.id,
          detailsHash: auditHash,
          previousHash: previousHash
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      receiptHash,
      timestamp: new Date(timestamp).toISOString(),
      constituencyName: user.constituency?.name || "Constituency",
      candidateName: selectedCandidateName
    });

  } catch (error: any) {
    console.error("Vote Cast Error:", error);
    return NextResponse.json({ error: "Failed to cast vote securely." }, { status: 500 });
  }
}
