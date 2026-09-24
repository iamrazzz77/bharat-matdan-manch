import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INDIA_MASTER_GEO } from "../../../../../prisma/seedData/indiaMasterGeo";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stateId = searchParams.get("stateId");
  const stateCode = searchParams.get("stateCode");
  const search = searchParams.get("search") || "";

  try {
    const whereClause: any = {};

    if (stateId) {
      whereClause.OR = [
        { stateId: stateId },
        { state: { code: stateId.toUpperCase() } },
        { state: { id: stateId } }
      ];
    } else if (stateCode) {
      whereClause.state = { code: stateCode.toUpperCase() };
    }

    if (search.trim()) {
      const q = search.trim();
      const searchCondition = [
        { name: { contains: q } },
        { nameHi: { contains: q } }
      ];
      if (whereClause.OR) {
        whereClause.AND = [
          { OR: whereClause.OR },
          { OR: searchCondition }
        ];
        delete whereClause.OR;
      } else {
        whereClause.OR = searchCondition;
      }
    }

    const districts = await prisma.district.findMany({
      where: whereClause,
      include: {
        state: { select: { id: true, code: true, name: true, nameHi: true } },
        _count: { select: { constituencies: true } }
      },
      orderBy: [
        { state: { name: "asc" } },
        { name: "asc" }
      ]
    });

    if (districts && districts.length > 0) {
      return NextResponse.json({
        success: true,
        mode: "ONLINE_DATABASE",
        total: districts.length,
        districts: districts.map((d) => ({
          id: d.id,
          stateId: d.stateId,
          stateCode: d.state.code,
          stateName: d.state.name,
          stateNameHi: d.state.nameHi,
          name: d.name,
          nameHi: d.nameHi,
          constituencyCount: d._count.constituencies
        }))
      });
    }

    throw new Error("Empty DB result for districts");
  } catch (error: any) {
    console.warn("GET /api/geography/districts operating in Hybrid Offline Fallback Mode:", error.message || error);

    let offlineDists: any[] = [];
    const targetStateCode = stateCode || stateId;

    INDIA_MASTER_GEO.forEach((s) => {
      if (!targetStateCode || s.code === targetStateCode.toUpperCase() || s.name.toLowerCase().includes(targetStateCode.toLowerCase())) {
        s.districts.forEach((d) => {
          offlineDists.push({
            id: `${s.code}:${d.name}`,
            stateId: s.code,
            stateCode: s.code,
            stateName: s.name,
            stateNameHi: s.nameHi,
            name: d.name,
            nameHi: d.nameHi,
            constituencyCount: d.constituencies.length
          });
        });
      }
    });

    return NextResponse.json({
      success: true,
      mode: "HYBRID_OFFLINE_CACHE",
      total: offlineDists.length,
      districts: offlineDists
    });
  }
}


