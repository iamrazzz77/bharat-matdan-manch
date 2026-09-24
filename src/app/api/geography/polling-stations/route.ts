import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const constituencyId = searchParams.get("constituencyId");
    const search = searchParams.get("search") || "";

    const whereClause: any = {};

    if (constituencyId) {
      whereClause.constituencyId = constituencyId;
    }

    if (search.trim()) {
      const q = search.trim();
      whereClause.OR = [
        { name: { contains: q } },
        { nameHi: { contains: q } },
        { stationCode: { contains: q } },
        { address: { contains: q } }
      ];
    }

    const stations = await prisma.pollingStation.findMany({
      where: whereClause,
      include: {
        booths: true,
        constituency: {
          select: { id: true, code: true, name: true }
        }
      },
      orderBy: { stationCode: "asc" }
    });

    return NextResponse.json({
      success: true,
      total: stations.length,
      pollingStations: stations.map((s) => ({
        id: s.id,
        stationCode: s.stationCode,
        name: s.name,
        nameHi: s.nameHi,
        address: s.address,
        constituencyId: s.constituencyId,
        constituencyName: s.constituency.name,
        booths: s.booths.map(b => ({
          id: b.id,
          boothNumber: b.boothNumber,
          officerUserId: b.officerUserId
        }))
      }))
    });
  } catch (error: any) {
    console.error("GET /api/geography/polling-stations error:", error);
    return NextResponse.json({ error: "Failed to fetch polling stations" }, { status: 500 });
  }
}
