import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Bharat Matdan Manch Database Seed...");

  // Clean old records
  await prisma.anonymousVote.deleteMany();
  await prisma.voterParticipation.deleteMany();
  await prisma.absenteeRequest.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.election.deleteMany();
  await prisma.party.deleteMany();
  await prisma.pollingBooth.deleteMany();
  await prisma.pollingStation.deleteMany();
  await prisma.user.deleteMany();
  await prisma.constituency.deleteMany();
  await prisma.district.deleteMany();
  await prisma.state.deleteMany();

  const passwordHash = await bcrypt.hash("Pass123!", 10);
  const voterPasswordHash = await bcrypt.hash("Voter123!", 10);

  // 1. States
  const mhState = await prisma.state.create({
    data: { code: "MH", name: "Maharashtra", nameHi: "महाराष्ट्र" }
  });
  const upState = await prisma.state.create({
    data: { code: "UP", name: "Uttar Pradesh", nameHi: "उत्तर प्रदेश" }
  });
  const klState = await prisma.state.create({
    data: { code: "KL", name: "Kerala", nameHi: "केरल" }
  });
  const dlState = await prisma.state.create({
    data: { code: "DL", name: "Delhi", nameHi: "दिल्ली" }
  });
  const kaState = await prisma.state.create({
    data: { code: "KA", name: "Karnataka", nameHi: "कर्नाटक" }
  });

  // 2. Districts
  const mumbaiDistrict = await prisma.district.create({
    data: { stateId: mhState.id, name: "Mumbai City", nameHi: "मुंबई शहर" }
  });
  const varanasiDistrict = await prisma.district.create({
    data: { stateId: upState.id, name: "Varanasi", nameHi: "वाराणसी" }
  });
  const wayanadDistrict = await prisma.district.create({
    data: { stateId: klState.id, name: "Wayanad", nameHi: "वायनाड" }
  });
  const newDelhiDistrict = await prisma.district.create({
    data: { stateId: dlState.id, name: "New Delhi", nameHi: "नई दिल्ली" }
  });
  const blrDistrict = await prisma.district.create({
    data: { stateId: kaState.id, name: "Bengaluru Urban", nameHi: "बेंगलुरु शहरी" }
  });

  // 3. Constituencies
  const mumbaiSouthPC = await prisma.constituency.create({
    data: {
      districtId: mumbaiDistrict.id,
      code: "PC01-MH",
      name: "Mumbai South",
      nameHi: "दक्षिण मुंबई",
      type: "PARLIAMENTARY",
      totalVoters: 1548000
    }
  });

  const varanasiPC = await prisma.constituency.create({
    data: {
      districtId: varanasiDistrict.id,
      code: "PC02-UP",
      name: "Varanasi",
      nameHi: "वाराणसी",
      type: "PARLIAMENTARY",
      totalVoters: 1850000
    }
  });

  const wayanadPC = await prisma.constituency.create({
    data: {
      districtId: wayanadDistrict.id,
      code: "PC03-KL",
      name: "Wayanad",
      nameHi: "वायनाड",
      type: "PARLIAMENTARY",
      totalVoters: 1380000
    }
  });

  const newDelhiPC = await prisma.constituency.create({
    data: {
      districtId: newDelhiDistrict.id,
      code: "PC04-DL",
      name: "New Delhi",
      nameHi: "नई दिल्ली",
      type: "PARLIAMENTARY",
      totalVoters: 1420000
    }
  });

  const blrSouthPC = await prisma.constituency.create({
    data: {
      districtId: blrDistrict.id,
      code: "PC05-KA",
      name: "Bengaluru South",
      nameHi: "बेंगलुरु दक्षिण",
      type: "PARLIAMENTARY",
      totalVoters: 2010000
    }
  });

  // 4. Polling Stations
  const stationMumbai = await prisma.pollingStation.create({
    data: {
      constituencyId: mumbaiSouthPC.id,
      stationCode: "ST-MH-01",
      name: "St. Xavier High School, Dhobi Talao",
      nameHi: "सेंट जेवियर्स हाई स्कूल, धोबी तलाव",
      address: "5, Mahapalika Marg, Mumbai, Maharashtra 400001"
    }
  });

  const stationVaranasi = await prisma.pollingStation.create({
    data: {
      constituencyId: varanasiPC.id,
      stationCode: "ST-UP-01",
      name: "Central Hindu Boys School, Kamachha",
      nameHi: "सेंट्रल हिंदू बॉयज स्कूल, कामाच्छा",
      address: "Kamachha, Varanasi, Uttar Pradesh 221010"
    }
  });

  const stationWayanad = await prisma.pollingStation.create({
    data: {
      constituencyId: wayanadPC.id,
      stationCode: "ST-KL-01",
      name: "St. Joseph Higher Secondary School",
      nameHi: "सेंट जोसेफ हायर सेकेंडरी स्कूल",
      address: "Sultan Bathery, Wayanad, Kerala 673592"
    }
  });

  // 5. Polling Booths
  const boothMumbai1 = await prisma.pollingBooth.create({
    data: { stationId: stationMumbai.id, boothNumber: 1 }
  });
  const boothVaranasi1 = await prisma.pollingBooth.create({
    data: { stationId: stationVaranasi.id, boothNumber: 1 }
  });

  // 6. Parties
  const bepParty = await prisma.party.create({
    data: {
      name: "Bharatiya Ekta Party",
      nameHi: "भारतीय एकता पार्टी",
      shortCode: "BEP",
      colorCode: "#FF9933",
      symbolIcon: "Sun"
    }
  });

  const npaParty = await prisma.party.create({
    data: {
      name: "National Progressive Alliance",
      nameHi: "राष्ट्रीय प्रगतिशील गठबंधन",
      shortCode: "NPA",
      colorCode: "#000080",
      symbolIcon: "Hand"
    }
  });

  const sjpParty = await prisma.party.create({
    data: {
      name: "Swaraj Janata Party",
      nameHi: "स्वराज जनता पार्टी",
      shortCode: "SJP",
      colorCode: "#138808",
      symbolIcon: "Shield"
    }
  });

  const dsfParty = await prisma.party.create({
    data: {
      name: "Democratic Secular Front",
      nameHi: "डेमोक्रेटिक सेक्युलर फ्रंट",
      shortCode: "DSF",
      colorCode: "#D4AF37",
      symbolIcon: "Star"
    }
  });

  // 7. Election
  const election2026 = await prisma.election.create({
    data: {
      title: "18th Lok Sabha General Elections 2026",
      titleHi: "18वीं लोकसभा आम चुनाव 2026",
      type: "GENERAL",
      status: "OPEN",
      startDate: new Date("2026-04-01T08:00:00Z"),
      endDate: new Date("2026-06-01T18:00:00Z"),
      totalSeats: 543,
      description: "Official Digital Ballot Election Platform for parliamentary representation across 543 constituencies in India."
    }
  });

  // 8. Candidates
  // Mumbai South Candidates
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: mumbaiSouthPC.id,
      partyId: bepParty.id,
      fullName: "Devendra Shinde",
      fullNameHi: "देवेंद्र शिंदे",
      ballotOrder: 1
    }
  });
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: mumbaiSouthPC.id,
      partyId: npaParty.id,
      fullName: "Milind Kadam",
      fullNameHi: "मिलिंद कदम",
      ballotOrder: 2
    }
  });
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: mumbaiSouthPC.id,
      partyId: sjpParty.id,
      fullName: "Prakash Thorat",
      fullNameHi: "प्रकाश थोरात",
      ballotOrder: 3
    }
  });
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: mumbaiSouthPC.id,
      fullName: "NONE OF THE ABOVE (NOTA)",
      fullNameHi: "इनमें से कोई नहीं (नोटा)",
      isNota: true,
      ballotOrder: 4
    }
  });

  // Varanasi Candidates
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: varanasiPC.id,
      partyId: bepParty.id,
      fullName: "Narendra Das",
      fullNameHi: "नरेन्द्र दास",
      ballotOrder: 1
    }
  });
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: varanasiPC.id,
      partyId: npaParty.id,
      fullName: "Ajay Rai",
      fullNameHi: "अजय राय",
      ballotOrder: 2
    }
  });
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: varanasiPC.id,
      fullName: "NONE OF THE ABOVE (NOTA)",
      fullNameHi: "इनमें से कोई नहीं (नोटा)",
      isNota: true,
      ballotOrder: 3
    }
  });

  // Wayanad Candidates
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: wayanadPC.id,
      partyId: npaParty.id,
      fullName: "Rahul Nair",
      fullNameHi: "राहुल नायर",
      ballotOrder: 1
    }
  });
  await prisma.candidate.create({
    data: {
      electionId: election2026.id,
      constituencyId: wayanadPC.id,
      partyId: bepParty.id,
      fullName: "K. Surendran",
      fullNameHi: "के. सुरेन्द्रन",
      ballotOrder: 2
    }
  });

  // 9. Users
  // Super Admin
  await prisma.user.create({
    data: {
      epicNumber: "EPIC000000",
      fullName: "Chief Election Commissioner (Super Admin)",
      email: "admin@eci.gov.in",
      phone: "+91-9876500000",
      passwordHash: passwordHash,
      role: "SUPER_ADMIN",
      isMfaEnabled: true
    }
  });

  // Election Officer Admin
  await prisma.user.create({
    data: {
      epicNumber: "EPIC000001",
      fullName: "District Election Officer (Admin)",
      email: "officer.admin@eci.gov.in",
      phone: "+91-9876500001",
      passwordHash: passwordHash,
      role: "ADMIN",
      stateId: mhState.id,
      constituencyId: mumbaiSouthPC.id
    }
  });

  // Polling Officer Mumbai
  const pollingOfficerMumbai = await prisma.user.create({
    data: {
      epicNumber: "EPIC000002",
      fullName: "Sanjay Deshmukh (Polling Officer)",
      email: "officer.mumbai@eci.gov.in",
      phone: "+91-9876500002",
      passwordHash: passwordHash,
      role: "POLLING_OFFICER",
      stateId: mhState.id,
      constituencyId: mumbaiSouthPC.id,
      stationId: stationMumbai.id,
      boothNumber: 1
    }
  });

  // Update booth officer link
  await prisma.pollingBooth.update({
    where: { id: boothMumbai1.id },
    data: { officerUserId: pollingOfficerMumbai.id }
  });

  // Auditor
  await prisma.user.create({
    data: {
      epicNumber: "EPIC000004",
      fullName: "National Election Auditor",
      email: "auditor@eci.gov.in",
      phone: "+91-9876500004",
      passwordHash: passwordHash,
      role: "AUDITOR"
    }
  });

  // Demo Voters
  await prisma.user.create({
    data: {
      epicNumber: "EPIC100001",
      aadhaarHash: "AADHAAR-HASH-8832-9910",
      fullName: "Rajesh Kumar Sharma",
      email: "voter.rajesh@demo.in",
      phone: "+91-9876510001",
      passwordHash: voterPasswordHash,
      role: "VOTER",
      stateId: mhState.id,
      constituencyId: mumbaiSouthPC.id,
      stationId: stationMumbai.id,
      boothNumber: 1
    }
  });

  await prisma.user.create({
    data: {
      epicNumber: "EPIC100002",
      aadhaarHash: "AADHAAR-HASH-1123-5544",
      fullName: "Priya Verma",
      email: "voter.priya@demo.in",
      phone: "+91-9876510002",
      passwordHash: voterPasswordHash,
      role: "VOTER",
      stateId: mhState.id,
      constituencyId: mumbaiSouthPC.id,
      stationId: stationMumbai.id,
      boothNumber: 1
    }
  });

  await prisma.user.create({
    data: {
      epicNumber: "EPIC100003",
      aadhaarHash: "AADHAAR-HASH-9988-7766",
      fullName: "Amit Patel",
      email: "voter.amit@demo.in",
      phone: "+91-9876510003",
      passwordHash: voterPasswordHash,
      role: "VOTER",
      stateId: upState.id,
      constituencyId: varanasiPC.id,
      stationId: stationVaranasi.id,
      boothNumber: 1
    }
  });

  await prisma.user.create({
    data: {
      epicNumber: "EPIC100004",
      aadhaarHash: "AADHAAR-HASH-4433-2211",
      fullName: "Sunita Devi",
      email: "voter.sunita@demo.in",
      phone: "+91-9876510004",
      passwordHash: voterPasswordHash,
      role: "VOTER",
      stateId: upState.id,
      constituencyId: varanasiPC.id,
      stationId: stationVaranasi.id,
      boothNumber: 1
    }
  });

  console.log("Database Seed Completed Successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
