import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { INDIA_MASTER_GEO } from "../../../../../prisma/seedData/indiaMasterGeo";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type"); // STATE or UNION_TERRITORY

    const whereClause: any = {};

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

    const states = await prisma.state.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            districts: true,
            users: true
          }
        }
      },
      orderBy: { name: "asc" }
    });

    if (states && states.length > 0) {
      return NextResponse.json({
        success: true,
        mode: "ONLINE_DATABASE",
        total: states.length,
        states: states.map((s) => ({
          id: s.id,
          code: s.code,
          name: s.name,
          nameHi: s.nameHi,
          type: s.type,
          totalSeats: s.totalSeats,
          districtCount: s._count.districts,
          voterCount: s._count.users
        }))
      });
    }

    throw new Error("Empty DB result - Falling back to Master Geo");
  } catch (error: any) {
    console.warn("GET /api/geography/states operating in Hybrid Offline Fallback Mode:", error.message || error);
    
    // Fallback using INDIA_MASTER_GEO
    let offlineStates = INDIA_MASTER_GEO.map((s) => ({
      id: s.code,
      code: s.code,
      name: s.name,
      nameHi: s.nameHi,
      type: s.type,
      totalSeats: s.totalSeats,
      districtCount: s.districts.length,
      voterCount: 150000
    }));

    return NextResponse.json({
      success: true,
      mode: "HYBRID_OFFLINE_CACHE",
      total: offlineStates.length,
      states: offlineStates
    });
  }
}

