import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { INDIA_MASTER_GEO } from "./seedData/indiaMasterGeo";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Bharat Matdan Manch Comprehensive Database Seed...");

  // 1. Clean existing records in reverse dependency order
  console.log("Cleaning previous database records...");
  await prisma.anonymousVote.deleteMany();
  await prisma.voterParticipation.deleteMany();
  await prisma.absenteeRequest.deleteMany();
  await prisma.auditLog.deleteMany();
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

  // Map to hold created DB models for fast lookup
  const createdStates: Record<string, any> = {};
  const createdDistricts: Record<string, any> = {};
  const createdConstituencies: Record<string, any> = {};
  const createdStations: Record<string, any> = {};

  console.log(`Seeding complete Master Geographic Hierarchy (${INDIA_MASTER_GEO.length} States/UTs)...`);

  for (const stData of INDIA_MASTER_GEO) {
    const state = await prisma.state.create({
      data: {
        code: stData.code,
        name: stData.name,
        nameHi: stData.nameHi,
        type: stData.type,
        totalSeats: stData.totalSeats
      }
    });
    createdStates[state.code] = state;

    for (const distData of stData.districts) {
      const district = await prisma.district.create({
        data: {
          stateId: state.id,
          name: distData.name,
          nameHi: distData.nameHi
        }
      });
      createdDistricts[`${state.code}:${district.name}`] = district;

      for (const constData of distData.constituencies) {
        const constituency = await prisma.constituency.create({
          data: {
            districtId: district.id,
            code: constData.code,
            name: constData.name,
            nameHi: constData.nameHi,
            type: constData.type,
            totalVoters: constData.totalVoters
          }
        });
        createdConstituencies[constituency.code] = constituency;

        for (const stStation of constData.pollingStations) {
          const station = await prisma.pollingStation.create({
            data: {
              constituencyId: constituency.id,
              stationCode: stStation.stationCode,
              name: stStation.name,
              nameHi: stStation.nameHi,
              address: stStation.address
            }
          });
          createdStations[station.stationCode] = station;

          for (const bData of stStation.booths) {
            await prisma.pollingBooth.create({
              data: {
                stationId: station.id,
                boothNumber: bData.boothNumber
              }
            });
          }
        }
      }
    }
  }

  console.log(`Geographic master hierarchy seeded successfully! Total States/UTs: ${Object.keys(createdStates).length}`);

  // 2. Political Parties Master Data
  console.log("Seeding National & Regional Political Parties...");
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

  // 3. National General Election Creation
  console.log("Creating 18th Lok Sabha General Elections 2026...");
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

  // 4. Register Candidates across ALL Constituencies in database
  console.log("Registering Candidates across ALL Parliamentary Constituencies...");

  const partyList = [bepParty, npaParty, sjpParty, dsfParty];
  const candidateFirstNames = ["Devendra", "Rahul", "Narendra", "Anand", "Suresh", "Priya", "Sunita", "Amit", "Kavita", "Rajesh", "Vikram", "Meenakshi", "Rohan", "Smriti"];
  const candidateLastNames = ["Sharma", "Nair", "Das", "Patel", "Shinde", "Verma", "Kumar", "Swamy", "Banerjee", "Singh", "Yadav", "Rao", "Reddy", "Thorat"];

  let candCounter = 1;

  for (const cCode of Object.keys(createdConstituencies)) {
    const constituency = createdConstituencies[cCode];
    const constName = constituency.name;

    // Seed 3 Party Candidates + 1 NOTA per constituency
    for (let pIdx = 0; pIdx < 3; pIdx++) {
      const party = partyList[(candCounter + pIdx) % partyList.length];
      const fn = candidateFirstNames[(candCounter * 3 + pIdx) % candidateFirstNames.length];
      const ln = candidateLastNames[(candCounter * 7 + pIdx) % candidateLastNames.length];

      await prisma.candidate.create({
        data: {
          electionId: election2026.id,
          constituencyId: constituency.id,
          partyId: party.id,
          fullName: `${fn} ${ln}`,
          fullNameHi: `${fn} ${ln}`,
          ballotOrder: pIdx + 1
        }
      });
    }

    // Add NOTA Candidate for each constituency
    await prisma.candidate.create({
      data: {
        electionId: election2026.id,
        constituencyId: constituency.id,
        fullName: "NONE OF THE ABOVE (NOTA)",
        fullNameHi: "इनमें से कोई नहीं (नोटा)",
        isNota: true,
        ballotOrder: 4
      }
    });

    candCounter++;
  }

  // 5. System Users (Super Admin, Admins, Polling Officers, Voters)
  console.log("Creating System Officers & Demo Voters...");

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

  // Admin Officer (Maharashtra)
  const mhState = createdStates["MH"];
  const mumbaiSouthPC = createdConstituencies["PC01-MH"];
  const stationMumbai = createdStations["ST-MH-01"];

  await prisma.user.create({
    data: {
      epicNumber: "EPIC000001",
      fullName: "District Election Officer (Admin)",
      email: "officer.admin@eci.gov.in",
      phone: "+91-9876500001",
      passwordHash: passwordHash,
      role: "ADMIN",
      stateId: mhState?.id,
      constituencyId: mumbaiSouthPC?.id
    }
  });

  // Polling Officer (Mumbai South)
  const pollingOfficerMumbai = await prisma.user.create({
    data: {
      epicNumber: "EPIC000002",
      fullName: "Sanjay Deshmukh (Polling Officer)",
      email: "officer.mumbai@eci.gov.in",
      phone: "+91-9876500002",
      passwordHash: passwordHash,
      role: "POLLING_OFFICER",
      stateId: mhState?.id,
      constituencyId: mumbaiSouthPC?.id,
      stationId: stationMumbai?.id,
      boothNumber: 1
    }
  });

  // National Auditor
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

  // Demo Voters across different States
  const upState = createdStates["UP"];
  const varanasiPC = createdConstituencies["PC02-UP"];
  const stationVaranasi = createdStations["ST-UP-01"];

  const klState = createdStates["KL"];
  const wayanadPC = createdConstituencies["PC03-KL"];
  const stationWayanad = createdStations["ST-KL-01"];

  const demoVoters = [
    { epic: "EPIC100001", name: "Rajesh Kumar Sharma", email: "voter.rajesh@demo.in", phone: "+91-9876510001", state: mhState, pc: mumbaiSouthPC, station: stationMumbai },
    { epic: "EPIC100002", name: "Priya Verma", email: "voter.priya@demo.in", phone: "+91-9876510002", state: mhState, pc: mumbaiSouthPC, station: stationMumbai },
    { epic: "EPIC100003", name: "Amit Patel", email: "voter.amit@demo.in", phone: "+91-9876510003", state: upState, pc: varanasiPC, station: stationVaranasi },
    { epic: "EPIC100004", name: "Sunita Devi", email: "voter.sunita@demo.in", phone: "+91-9876510004", state: upState, pc: varanasiPC, station: stationVaranasi },
    { epic: "EPIC100005", name: "Anish Kurup", email: "voter.anish@demo.in", phone: "+91-9876510005", state: klState, pc: wayanadPC, station: stationWayanad }
  ];

  for (const dv of demoVoters) {
    if (dv.state && dv.pc) {
      await prisma.user.create({
        data: {
          epicNumber: dv.epic,
          aadhaarHash: `AADHAAR-HASH-${dv.epic.slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`,
          fullName: dv.name,
          email: dv.email,
          phone: dv.phone,
          passwordHash: voterPasswordHash,
          role: "VOTER",
          stateId: dv.state.id,
          constituencyId: dv.pc.id,
          stationId: dv.station ? dv.station.id : null,
          boothNumber: 1
        }
      });
    }
  }

  // 6. Initial Seed Votes across multiple States for realistic initial live tally
  console.log("Simulating realistic initial baseline votes across constituencies...");
  const allCandidates = await prisma.candidate.findMany({ include: { constituency: true } });

  for (let i = 0; i < 150; i++) {
    const cand = allCandidates[i % allCandidates.length];
    const timestamp = Date.now() - i * 10000;
    const receiptHash = `BMM-INIT-${cand.id.slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;

    await prisma.anonymousVote.create({
      data: {
        electionId: election2026.id,
        constituencyId: cand.constituencyId,
        candidateId: cand.isNota ? null : cand.id,
        hashReceipt: receiptHash,
        tamperCheckHash: `HASH-${receiptHash}-${election2026.id}`
      }
    });
  }

  // Genesis Audit Log entry
  await prisma.auditLog.create({
    data: {
      action: "DATABASE_MASTER_GEO_SEEDED",
      entityType: "SYSTEM",
      entityId: election2026.id,
      detailsHash: "0000000000000000000000000000000000000000000000000000000000000000",
      previousHash: "GENESIS_HASH_MASTER_INDIA_GEO_2026"
    }
  });

  console.log("Database Seed Completed Successfully! All 36 States/UTs populated with candidates and baseline votes.");
}

main()
  .catch((e) => {
    console.error("Database Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
