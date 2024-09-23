import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';

@Controller('battles')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post('submit-roaster')
  async submitRoaster(
    @Body() body: { userId: string, cards: { cardId: string, lane: number }[] }
  ): Promise<string> {
    const { userId, cards } = body;
    return this.battleService.submitRoaster(userId, cards);
  }

  @Post('create-round')
  async createBattleRound(): Promise<string> {
    return this.battleService.createBattleRound();
  }

  @Post('process-outcomes')
  async processBattleOutcomes(): Promise<string> {
    return this.battleService.processBattleOutcomes();
  }
}