import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battle } from './entities/battle.entity';
import { BattleCard } from './entities/battleCard.entity';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { User } from './entities/user.entity';
import { Card } from './entities/card.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Battle, BattleCard, User, Card])],
  providers: [BattleService, SeedService],
  controllers: [BattleController],
})
export class BattleModule {}
