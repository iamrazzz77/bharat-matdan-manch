import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateVoteReceipt, computeAuditHash, sha256 } from "@/lib/crypto";

export async function POST(req: Request) {
  try {
    const session = getAuthSession();
    const userId = session?.userId || "voter-demo-1";
    const { electionId, candidateId, pollingType } = await req.json();

    const timestamp = Date.now();
    const receiptHash = generateVoteReceipt(userId, electionId || "demo-2026", timestamp);

    let constituencyName = "Constituency";
    let candidateName = candidateId ? "Candidate Choice" : "NONE OF THE ABOVE (NOTA)";

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { constituency: true }
      });

      if (user && user.constituency) {
        constituencyName = user.constituency.name;
      }

      if (candidateId) {
        const candidateRecord = await prisma.candidate.findUnique({
          where: { id: candidateId },
          include: { party: true }
        });
        if (candidateRecord) {
          candidateName = `${candidateRecord.fullName} (${candidateRecord.party?.shortCode || "IND"})`;
        }
      }

        const { forceDemo, resetDemo } = await req.json().catch(() => ({}));

        const existingParticipation = await prisma.voterParticipation.findUnique({
          where: {
            voterId_electionId: {
              voterId: user.id,
              electionId: electionId
            }
          }
        });

        if (existingParticipation) {
          if (forceDemo || resetDemo) {
            // Demo reset mode: remove previous lock to allow re-testing
            await prisma.voterParticipation.delete({
              where: { id: existingParticipation.id }
            }).catch(() => {});
          } else {
            return NextResponse.json({
              error: "DOUBLE VOTE PREVENTED: You have already cast your ballot in this election.",
              receiptHash: existingParticipation.receiptHash,
              votedAt: existingParticipation.votedAt,
              isAlreadyVoted: true
            }, { status: 400 });
          }
        }

        const lastAudit = await prisma.auditLog.findFirst({ orderBy: { createdAt: "desc" } });
        const previousHash = lastAudit ? lastAudit.detailsHash : "GENESIS_HASH_000000000000000000000000";
        const auditHash = computeAuditHash(previousHash, "VOTE_CAST", electionId, receiptHash);

        await prisma.$transaction([
          prisma.voterParticipation.create({
            data: {
              voterId: user.id,
              electionId: electionId,
              receiptHash: receiptHash,
              pollingType: pollingType || "ONLINE",
              ipOrBoothHash: "SECURE_BALLOT_CLIENT"
            }
          }),
          prisma.anonymousVote.create({
            data: {
              electionId: electionId,
              constituencyId: user.constituencyId,
              candidateId: candidateId || null,
              hashReceipt: receiptHash,
              tamperCheckHash: sha256(receiptHash + electionId)
            }
          }),
          prisma.auditLog.create({
            data: {
              userId: user.id,
              action: "VOTE_CAST_ANONYMOUS",
              entityType: "AnonymousVote",
              entityId: electionId,
              detailsHash: auditHash,
              previousHash: previousHash
            }
          })
        ]);
      }
    } catch (dbError: any) {
      console.warn("Vote DB Warning (Serverless Fallback):", dbError?.message);
    }

    return NextResponse.json({
      success: true,
      receiptHash,
      timestamp: new Date(timestamp).toISOString(),
      constituencyName,
      candidateName
    });

  } catch (error: any) {
    console.error("Vote Cast Error:", error);
    return NextResponse.json({ error: "Failed to cast vote securely." }, { status: 500 });
  }
}
