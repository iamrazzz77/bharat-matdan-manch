import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const mockCandidates = [
  { id: "cand-m1", fullName: "Devendra Shinde", fullNameHi: "देवेंद्र शिंदे", ballotOrder: 1, isNota: false, party: { name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", symbolIcon: "Sun" } },
  { id: "cand-m2", fullName: "Milind Kadam", fullNameHi: "मिलिंद कदम", ballotOrder: 2, isNota: false, party: { name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", symbolIcon: "Hand" } },
  { id: "cand-m3", fullName: "Prakash Thorat", fullNameHi: "प्रकाश थोरात", ballotOrder: 3, isNota: false, party: { name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", symbolIcon: "Shield" } },
  { id: "cand-mnota", fullName: "NONE OF THE ABOVE (NOTA)", fullNameHi: "इनमें से कोई नहीं (नोटा)", ballotOrder: 4, isNota: true, party: null }
];

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
      candidates: candidates.length > 0 ? candidates : mockCandidates
    });
  } catch (error: any) {
    console.warn("Elections Fetch Warning:", error?.message);
    return NextResponse.json({
      elections: [{ id: "demo-2026", title: "18th Lok Sabha General Elections 2026", titleHi: "18वीं लोकसभा आम चुनाव 2026", status: "OPEN" }],
      activeElection: { id: "demo-2026", title: "18th Lok Sabha General Elections 2026", titleHi: "18वीं लोकसभा आम चुनाव 2026", status: "OPEN" },
      candidates: mockCandidates
    });
  }
}
