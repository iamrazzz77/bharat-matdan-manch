import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const electionIdParam = searchParams.get("electionId");

    const activeElection = electionIdParam
      ? await prisma.election.findUnique({ where: { id: electionIdParam } })
      : await prisma.election.findFirst({ where: { status: "OPEN" } }) || await prisma.election.findFirst();

    if (!activeElection) {
      return NextResponse.json({
        partyTally: [],
        constituencyResults: [],
        totalVotesCounted: 0,
        nationalTurnoutPercent: "0%"
      });
    }

    // Fetch all votes cast for active election
    const votes = await prisma.anonymousVote.findMany({
      where: { electionId: activeElection.id },
      include: {
        candidate: {
          include: { party: true }
        },
        constituency: {
          include: {
            district: {
              include: { state: true }
            }
          }
        }
      }
    });

    const totalVotesCounted = votes.length;

    // Fetch total registered voters
    const totalRegisteredVoters = await prisma.user.count({
      where: { role: "VOTER" }
    });

    const turnoutPct = totalRegisteredVoters > 0
      ? ((totalVotesCounted / totalRegisteredVoters) * 100).toFixed(1) + "%"
      : "67.8%";

    // Aggregate Party Tallies
    const partyMap: Record<string, { partyId: string; name: string; nameHi: string; shortCode: string; colorCode: string; votes: number; seatsWon: number }> = {};

    // Get all parties
    const parties = await prisma.party.findMany();
    parties.forEach(p => {
      partyMap[p.id] = {
        partyId: p.id,
        name: p.name,
        nameHi: p.nameHi,
        shortCode: p.shortCode,
        colorCode: p.colorCode,
        votes: 0,
        seatsWon: 0
      };
    });

    // Add NOTA party entry
    partyMap["NOTA"] = {
      partyId: "NOTA",
      name: "NONE OF THE ABOVE (NOTA)",
      nameHi: "इनमें से कोई नहीं (नोटा)",
      shortCode: "NOTA",
      colorCode: "#94A3B8",
      votes: 0,
      seatsWon: 0
    };

    // Tally candidate votes per constituency
    const constituencyCandidateVotes: Record<string, Record<string, { candidateName: string; partyShortCode: string; partyColor: string; votes: number }>> = {};

    votes.forEach(v => {
      const partyId = v.candidate?.partyId || "NOTA";
      if (partyMap[partyId]) {
        partyMap[partyId].votes += 1;
      }

      const constId = v.constituencyId;
      if (!constituencyCandidateVotes[constId]) {
        constituencyCandidateVotes[constId] = {};
      }

      const candId = v.candidateId || "NOTA";
      if (!constituencyCandidateVotes[constId][candId]) {
        constituencyCandidateVotes[constId][candId] = {
          candidateName: v.candidate ? v.candidate.fullName : "NOTA",
          partyShortCode: v.candidate?.party?.shortCode || "NOTA",
          partyColor: v.candidate?.party?.colorCode || "#94A3B8",
          votes: 0
        };
      }
      constituencyCandidateVotes[constId][candId].votes += 1;
    });

    // Determine leading candidate per constituency
    const constituencies = await prisma.constituency.findMany({
      include: {
        district: {
          include: { state: true }
        }
      }
    });

    const constituencyResults = constituencies.map(c => {
      const candVotes = constituencyCandidateVotes[c.id] || {};
      let maxVotes = 0;
      let winnerName = "Awaiting Votes";
      let winnerParty = "N/A";
      let winnerColor = "#64748B";

      Object.entries(candVotes).forEach(([_, item]) => {
        if (item.votes > maxVotes) {
          maxVotes = item.votes;
          winnerName = item.candidateName;
          winnerParty = item.partyShortCode;
          winnerColor = item.partyColor;
        }
      });

      // Update seats won count
      const matchingParty = Object.values(partyMap).find(p => p.shortCode === winnerParty);
      if (matchingParty && maxVotes > 0) {
        matchingParty.seatsWon += 1;
      }

      const constTotalVotes = Object.values(candVotes).reduce((acc, curr) => acc + curr.votes, 0);

      return {
        id: c.id,
        code: c.code,
        name: c.name,
        nameHi: c.nameHi,
        stateName: c.district.state.name,
        stateCode: c.district.state.code,
        totalVoters: c.totalVoters,
        votesCounted: constTotalVotes,
        turnoutPercent: c.totalVoters > 0 ? ((constTotalVotes / 1000) * 100).toFixed(1) + "%" : "68.5%",
        leadingCandidate: winnerName,
        leadingParty: winnerParty,
        leadingColor: winnerColor,
        votesMap: candVotes
      };
    });

    const partyTally = Object.values(partyMap).sort((a, b) => b.votes - a.votes);

    return NextResponse.json({
      election: {
        id: activeElection.id,
        title: activeElection.title,
        titleHi: activeElection.titleHi,
        status: activeElection.status
      },
      partyTally,
      constituencyResults,
      totalVotesCounted,
      nationalTurnoutPercent: turnoutPct
    });
  } catch (error: any) {
    console.error("Results API Error:", error);
    return NextResponse.json({ error: "Failed to load election results" }, { status: 500 });
  }
}
