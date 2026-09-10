import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable Feld
export class VoteService {
  private prisma = new PrismaClient();

  async castVote(data: { voterId: string; electionId: string; constituencyId: string; candidateId?: string }) {
    // 1. Double vote prevention
    const existing = await this.prisma.voterParticipation.findUnique({
      where: {
        voterId_electionId: {
          voterId: data.voterId,
          electionId: data.electionId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('DOUBLE VOTE PREVENTED: Voter has already cast a ballot in this election.');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const raw = `${data.voterId}:${data.electionId}:${Date.now()}:${salt}`;
    const receiptHash = 'BMM-NEST-' + crypto.createHash('sha256').update(raw).digest('hex').substring(0, 20).toUpperCase();

    // Transaction
    await this.prisma.$transaction([
      this.prisma.voterParticipation.create({
        data: {
          voterId: data.voterId,
          electionId: data.electionId,
          receiptHash: receiptHash,
          pollingType: 'ONLINE',
          ipOrBoothHash: 'NESTJS_CLIENT',
        },
      }),
      this.prisma.anonymousVote.create({
        data: {
          electionId: data.electionId,
          constituencyId: data.constituencyId,
          candidateId: data.candidateId || null,
          hashReceipt: receiptHash,
          tamperCheckHash: crypto.createHash('sha256').update(receiptHash + data.electionId).digest('hex'),
        },
      }),
    ]);

    return {
      success: true,
      receiptHash,
      timestamp: new Date().toISOString(),
    };
  }

  async verifyReceipt(receiptHash: string) {
    const anonymousVote = await this.prisma.anonymousVote.findUnique({
      where: { hashReceipt: receiptHash },
    });

    if (!anonymousVote) {
      return { verified: false, message: 'Receipt hash not found in tamper-evident database.' };
    }

    return {
      verified: true,
      castAt: anonymousVote.castAt,
      tamperCheckHash: anonymousVote.tamperCheckHash,
    };
  }
}
