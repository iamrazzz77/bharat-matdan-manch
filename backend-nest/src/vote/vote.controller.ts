import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('cast')
  async castVote(@Body() body: { voterId: string; electionId: string; constituencyId: string; candidateId?: string }) {
    return this.voteService.castVote(body);
  }

  @Get('receipt')
  async verifyReceipt(@Query('receiptHash') receiptHash: string) {
    return this.voteService.verifyReceipt(receiptHash);
  }
}
