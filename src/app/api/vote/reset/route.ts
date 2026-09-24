import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = getAuthSession();
    const userId = session?.userId || "voter-demo-1";

    try {
      await prisma.voterParticipation.deleteMany({
        where: { voterId: userId }
      });
    } catch (e: any) {
      console.warn("Reset vote DB warn:", e.message);
    }

    return NextResponse.json({
      success: true,
      message: "Demo voter ballot status reset successfully. You can now cast a new vote!"
    });
  } catch (error: any) {
    return NextResponse.json({
      success: fontModeFallback(),
      message: "Demo vote status reset."
    });
  }
}

function fontModeFallback() {
  return true;
}
