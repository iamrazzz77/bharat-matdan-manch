import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const constituencyId = searchParams.get("constituencyId");

    const elections = await prisma.election.findMany({
      orderBy: { createdAt: "desc" }
    });

    const activeElection = elections.find(e => e.status === "OPEN") || elections[0];

    let candidates: any[] = [];
    if (activeElection && constituencyId) {
      candidates = await prisma.candidate.findMany({
        where: {
          electionId: activeElection.id,
          constituencyId: constituencyId
        },
        include: {
          party: true
        },
        orderBy: { ballotOrder: "asc" }
      });
    }

    return NextResponse.json({
      elections,
      activeElection,
      candidates
    });
  } catch (error: any) {
    console.error("Elections Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch election details" }, { status: 500 });
  }
}
