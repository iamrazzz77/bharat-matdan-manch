import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INDIA_MASTER_GEO } from "../../../../../prisma/seedData/indiaMasterGeo";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const districtId = searchParams.get("districtId");
  const stateId = searchParams.get("stateId");
  const stateCode = searchParams.get("stateCode");
  const type = searchParams.get("type"); // PARLIAMENTARY or ASSEMBLY
  const search = searchParams.get("search") || "";

  try {
    const whereClause: any = {};

    if (districtId) {
      whereClause.OR = [
        { districtId: districtId },
        { district: { name: { contains: districtId } } }
      ];
    } else if (stateId) {
      whereClause.district = {
        OR: [
          { stateId: stateId },
          { state: { code: stateId.toUpperCase() } }
        ]
      };
    } else if (stateCode) {
      whereClause.district = { state: { code: stateCode.toUpperCase() } };
    }

    if (type) {
      whereClause.type = type.toUpperCase();
    }

    if (search.trim()) {
      const q = search.trim();
      whereClause.OR = [
        { name: { contains: q } },
        { nameHi: { contains: q } },
        { code: { contains: q } }
      ];
    }

    const constituencies = await prisma.constituency.findMany({
      where: whereClause,
      include: {
        district: {
          include: {
            state: { select: { id: true, code: true, name: true } }
          }
        },
        _count: {
          select: {
            pollingStations: true,
            candidates: true
          }
        }
      },
      orderBy: { name: "asc" }
    });

    if (constituencies && constituencies.length > 0) {
      return NextResponse.json({
        success: true,
        mode: "ONLINE_DATABASE",
        total: constituencies.length,
        constituencies: constituencies.map((c) => ({
          id: c.id,
          code: c.code,
          name: c.name,
          nameHi: c.nameHi,
          type: c.type,
          totalVoters: c.totalVoters,
          districtId: c.districtId,
          districtName: c.district.name,
          stateId: c.district.state.id,
          stateCode: c.district.state.code,
          stateName: c.district.state.name,
          stationCount: c._count.pollingStations,
          candidateCount: c._count.candidates
        }))
      });
    }

    throw new Error("Empty DB result for constituencies");
  } catch (error: any) {
    console.warn("GET /api/geography/constituencies operating in Hybrid Offline Fallback Mode:", error.message || error);

    let offlineConsts: any[] = [];
    const targetState = stateCode || stateId;

    INDIA_MASTER_GEO.forEach((s) => {
      if (!targetState || s.code === targetState.toUpperCase() || s.name.toLowerCase().includes(targetState.toLowerCase())) {
        s.districts.forEach((d) => {
          const distKey = `${s.code}:${d.name}`;
          if (!districtId || districtId === distKey || d.name.toLowerCase().includes(districtId.toLowerCase())) {
            d.constituencies.forEach((c) => {
              offlineConsts.push({
                id: c.code,
                code: c.code,
                name: c.name,
                nameHi: c.nameHi,
                type: c.type,
                totalVoters: c.totalVoters,
                districtId: distKey,
                districtName: d.name,
                stateId: s.code,
                stateCode: s.code,
                stateName: s.name,
                stationCount: c.pollingStations.length,
                candidateCount: 4
              });
            });
          }
        });
      }
    });

    return NextResponse.json({
      success: true,
      mode: "HYBRID_OFFLINE_CACHE",
      total: offlineConsts.length,
      constituencies: offlineConsts
    });
  }
}

