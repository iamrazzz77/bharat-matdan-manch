import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateVoteReceipt, sha256 } from "@/lib/crypto";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { count = 1 } = await req.json();

    // Fetch active election
    const activeElection = await prisma.election.findFirst({
      where: { status: "OPEN" }
    }) || await prisma.election.findFirst();

    if (!activeElection) {
      return NextResponse.json({ error: "No active election found" }, { status: 400 });
    }

    // Fetch candidates grouped by constituency
    const candidates = await prisma.candidate.findMany({
      where: { electionId: activeElection.id },
      include: {
        constituency: true,
        party: true
      }
    });

    if (!candidates || candidates.length === 0) {
      return NextResponse.json({ error: "No candidates available for simulation" }, { status: 400 });
    }

    const castEvents = [];

    for (let i = 0; i < count; i++) {
      // Pick random candidate
      const randomCand = candidates[Math.floor(Math.random() * candidates.length)];
      const timestamp = Date.now() + i;
      const receiptHash = "BMM-SIM-" + sha256(`SIM:${randomCand.id}:${timestamp}:${Math.random()}`).substring(0, 18).toUpperCase();

      // Create anonymous vote
      await prisma.anonymousVote.create({
        data: {
          electionId: activeElection.id,
          constituencyId: randomCand.constituencyId,
          candidateId: randomCand.isNota ? null : randomCand.id,
          hashReceipt: receiptHash,
          tamperCheckHash: sha256(receiptHash + activeElection.id)
        }
      });

      castEvents.push({
        constituencyName: randomCand.constituency.name,
        candidateName: randomCand.fullName,
        partyCode: randomCand.isNota ? "NOTA" : randomCand.party?.shortCode || "IND",
        partyColor: randomCand.party?.colorCode || "#94A3B8",
        receiptHash
      });
    }

    // Total votes count
    const totalVotes = await prisma.anonymousVote.count({
      where: { electionId: activeElection.id }
    });

    return NextResponse.json({
      success: true,
      simulatedCount: count,
      totalVotes,
      latestEvents: castEvents
    });

  } catch (error: any) {
    console.error("Demo Simulation API Error:", error);
    return NextResponse.json({ error: "Failed to run vote simulation" }, { status: 500 });
  }
}

// Reset simulated votes
export async function DELETE() {
  try {
    await prisma.anonymousVote.deleteMany();
    await prisma.voterParticipation.deleteMany();
    return NextResponse.json({ success: true, message: "Demo votes reset to zero" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reset demo votes" }, { status: 500 });
  }
}
