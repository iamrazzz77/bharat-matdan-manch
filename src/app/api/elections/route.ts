import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getConstituencyCandidates(constituencyId?: string) {
  const cid = (constituencyId || "").toUpperCase();

  if (cid.includes("UP") || cid.includes("VARANASI") || cid.includes("LUCKNOW") || cid.includes("GORAKHPUR")) {
    return [
      { id: "cand-up1", fullName: "Narendra Swamy", fullNameHi: "नरेन्द्र स्वामी", ballotOrder: 1, isNota: false, party: { name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", symbolIcon: "Sun" } },
      { id: "cand-up2", fullName: "Akhilesh Yadav", fullNameHi: "अखिलेश यादव", ballotOrder: 2, isNota: false, party: { name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", symbolIcon: "Hand" } },
      { id: "cand-up3", fullName: "Mayawati Devi", fullNameHi: "मायावती देवी", ballotOrder: 3, isNota: false, party: { name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", symbolIcon: "Shield" } },
      { id: "cand-up4", fullName: "Ravi Kishan", fullNameHi: "रवि किशन", ballotOrder: 4, isNota: false, party: { name: "Democratic Secular Front", shortCode: "DSF", colorCode: "#D4AF37", symbolIcon: "Star" } },
      { id: "cand-nota", fullName: "NONE OF THE ABOVE (NOTA)", fullNameHi: "इनमें से कोई नहीं (नोटा)", ballotOrder: 5, isNota: true, party: null }
    ];
  }

  if (cid.includes("KL") || cid.includes("WAYANAD") || cid.includes("THIRUVANANTHAPURAM")) {
    return [
      { id: "cand-kl1", fullName: "Rahul Nair", fullNameHi: "राहुल नायर", ballotOrder: 1, isNota: false, party: { name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", symbolIcon: "Hand" } },
      { id: "cand-kl2", fullName: "Pinarayi Kurup", fullNameHi: "पिनाराई कुरुप", ballotOrder: 2, isNota: false, party: { name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", symbolIcon: "Sun" } },
      { id: "cand-kl3", fullName: "Shashi Tharoor", fullNameHi: "शशि थरूर", ballotOrder: 3, isNota: false, party: { name: "Democratic Secular Front", shortCode: "DSF", colorCode: "#D4AF37", symbolIcon: "Star" } },
      { id: "cand-kl4", fullName: "K. Surendran", fullNameHi: "के. सुरेन्दन", ballotOrder: 4, isNota: false, party: { name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", symbolIcon: "Shield" } },
      { id: "cand-nota", fullName: "NONE OF THE ABOVE (NOTA)", fullNameHi: "इनमें से कोई नहीं (नोटा)", ballotOrder: 5, isNota: true, party: null }
    ];
  }

  if (cid.includes("BR") || cid.includes("PATNA") || cid.includes("GAYA") || cid.includes("DARBHANGA")) {
    return [
      { id: "cand-br1", fullName: "Nitish Kumar", fullNameHi: "नीतीश कुमार", ballotOrder: 1, isNota: false, party: { name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", symbolIcon: "Sun" } },
      { id: "cand-br2", fullName: "Tejashwi Yadav", fullNameHi: "तेजस्वी यादव", ballotOrder: 2, isNota: false, party: { name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", symbolIcon: "Hand" } },
      { id: "cand-br3", fullName: "Chirag Paswan", fullNameHi: "चिराग पासवान", ballotOrder: 3, isNota: false, party: { name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", symbolIcon: "Shield" } },
      { id: "cand-br4", fullName: "Pappu Yadav", fullNameHi: "पप्पू यादव", ballotOrder: 4, isNota: false, party: { name: "Democratic Secular Front", shortCode: "DSF", colorCode: "#D4AF37", symbolIcon: "Star" } },
      { id: "cand-nota", fullName: "NONE OF THE ABOVE (NOTA)", fullNameHi: "इनमें से कोई नहीं (नोटा)", ballotOrder: 5, isNota: true, party: null }
    ];
  }

  if (cid.includes("WB") || cid.includes("KOLKATA") || cid.includes("DIBRUGARH") || cid.includes("AS")) {
    return [
      { id: "cand-wb1", fullName: "Smriti Banerjee", fullNameHi: "स्मृति बनर्जी", ballotOrder: 1, isNota: false, party: { name: "Democratic Secular Front", shortCode: "DSF", colorCode: "#D4AF37", symbolIcon: "Star" } },
      { id: "cand-wb2", fullName: "Abhishek Roy", fullNameHi: "अभिषेक रॉय", ballotOrder: 2, isNota: false, party: { name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", symbolIcon: "Sun" } },
      { id: "cand-wb3", fullName: "Adhir Chowdhury", fullNameHi: "अधीर चौधरी", ballotOrder: 3, isNota: false, party: { name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", symbolIcon: "Hand" } },
      { id: "cand-wb4", fullName: "Babul Supriyo", fullNameHi: "बाबुल सुप्रियो", ballotOrder: 4, isNota: false, party: { name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", symbolIcon: "Shield" } },
      { id: "cand-nota", fullName: "NONE OF THE ABOVE (NOTA)", fullNameHi: "इनमें से कोई नहीं (नोटा)", ballotOrder: 5, isNota: true, party: null }
    ];
  }

  if (cid.includes("KA") || cid.includes("BANGALORE") || cid.includes("MYSORE") || cid.includes("AP")) {
    return [
      { id: "cand-ka1", fullName: "Anand Patel", fullNameHi: "आनंद पटेल", ballotOrder: 1, isNota: false, party: { name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", symbolIcon: "Hand" } },
      { id: "cand-ka2", fullName: "Tejasvi Surya", fullNameHi: "तेजस्वी सूर्या", ballotOrder: 2, isNota: false, party: { name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", symbolIcon: "Sun" } },
      { id: "cand-ka3", fullName: "HD Kumaraswamy", fullNameHi: "एचडी कुमारस्वामी", ballotOrder: 3, isNota: false, party: { name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", symbolIcon: "Shield" } },
      { id: "cand-ka4", fullName: "DK Shivakumar", fullNameHi: "डीके शिवकुमार", ballotOrder: 4, isNota: false, party: { name: "Democratic Secular Front", shortCode: "DSF", colorCode: "#D4AF37", symbolIcon: "Star" } },
      { id: "cand-nota", fullName: "NONE OF THE ABOVE (NOTA)", fullNameHi: "इनमें से कोई नहीं (नोटा)", ballotOrder: 5, isNota: true, party: null }
    ];
  }

  if (cid.includes("DL") || cid.includes("CHANDNI") || cid.includes("DELHI")) {
    return [
      { id: "cand-dl1", fullName: "Arvind Kejriwal", fullNameHi: "अरविंद केजरीवाल", ballotOrder: 1, isNota: false, party: { name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", symbolIcon: "Shield" } },
      { id: "cand-dl2", fullName: "Gautam Gambhir", fullNameHi: "गौतम गंभीर", ballotOrder: 2, isNota: false, party: { name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", symbolIcon: "Sun" } },
      { id: "cand-dl3", fullName: "Kanhaiya Kumar", fullNameHi: "कन्हैया कुमार", ballotOrder: 3, isNota: false, party: { name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", symbolIcon: "Hand" } },
      { id: "cand-dl4", fullName: "Manoj Tiwari", fullNameHi: "मनोज तिवारी", ballotOrder: 4, isNota: false, party: { name: "Democratic Secular Front", shortCode: "DSF", colorCode: "#D4AF37", symbolIcon: "Star" } },
      { id: "cand-nota", fullName: "NONE OF THE ABOVE (NOTA)", fullNameHi: "इनमें से कोई नहीं (नोटा)", ballotOrder: 5, isNota: true, party: null }
    ];
  }

  // Default Maharashtra / Standard Roster
  return [
    { id: "cand-m1", fullName: "Devendra Shinde", fullNameHi: "देवेंद्र शिंदे", ballotOrder: 1, isNota: false, party: { name: "Bharatiya Ekta Party", shortCode: "BEP", colorCode: "#FF9933", symbolIcon: "Sun" } },
    { id: "cand-m2", fullName: "Milind Kadam", fullNameHi: "मिलिंद कदम", ballotOrder: 2, isNota: false, party: { name: "National Progressive Alliance", shortCode: "NPA", colorCode: "#000080", symbolIcon: "Hand" } },
    { id: "cand-m3", fullName: "Prakash Thorat", fullNameHi: "प्रकाश थोरात", ballotOrder: 3, isNota: false, party: { name: "Swaraj Janata Party", shortCode: "SJP", colorCode: "#138808", symbolIcon: "Shield" } },
    { id: "cand-m4", fullName: "Anand Nair", fullNameHi: "आनंद नायर", ballotOrder: 4, isNota: false, party: { name: "Democratic Secular Front", shortCode: "DSF", colorCode: "#D4AF37", symbolIcon: "Star" } },
    { id: "cand-nota", fullName: "NONE OF THE ABOVE (NOTA)", fullNameHi: "इनमें से कोई नहीं (नोटा)", ballotOrder: 5, isNota: true, party: null }
  ];
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const constituencyId = searchParams.get("constituencyId");

    let elections: any[] = [];
    try {
      elections = await prisma.election.findMany({
        orderBy: { createdAt: "desc" }
      });
    } catch (e) {}

    const defaultElection = { id: "elec-2026", title: "18th Lok Sabha General Elections 2026", titleHi: "18वीं लोकसभा आम चुनाव 2026", status: "OPEN" };
    const activeElection = (elections && elections.length > 0) ? (elections.find(e => e.status === "OPEN") || elections[0]) : defaultElection;

    let candidates: any[] = [];
    if (activeElection && constituencyId) {
      try {
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
      } catch (e) {}
    }

    const roster = (candidates && candidates.length > 0)
      ? candidates
      : getConstituencyCandidates(constituencyId || undefined);

    return NextResponse.json({
      elections: elections.length > 0 ? elections : [defaultElection],
      activeElection,
      candidates: roster
    });
  } catch (error: any) {
    console.warn("Elections Fetch Warning:", error?.message);
    const fallbackElection = { id: "demo-2026", title: "18th Lok Sabha General Elections 2026", titleHi: "18वीं लोकसभा आम चुनाव 2026", status: "OPEN" };
    return NextResponse.json({
      elections: [fallbackElection],
      activeElection: fallbackElection,
      candidates: getConstituencyCandidates()
    });
  }
}

