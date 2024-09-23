import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './entities/battle.entity';
import { User } from './entities//user.entity';
import { BattleCard } from './entities/battlecard.entity';
import { Card } from './entities/card.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Battle)
    private battleRepository: Repository<Battle>,
    
    @InjectRepository(BattleCard)
    private battleCardRepository: Repository<BattleCard>,
    
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Card)
    private cardRepository: Repository<Card>
  ) {}

  async submitRoaster(userId: string, cards: { cardId: string, lane: number }[]): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    for (const { cardId, lane } of cards) {
      const card = await this.cardRepository.findOne({ where: { id: cardId } });
      if (!card) {
        throw new Error('Card not found');
      }
      const battleCard = new BattleCard();
      battleCard.user = user;
      battleCard.card = card;
      battleCard.lane = lane;
      await this.battleCardRepository.save(battleCard);
    }

    return 'Roaster submitted successfully';
  }

  async createBattleRound(): Promise<string> {
    const users = await this.userRepository.find();
    if (users.length < 2) {
      throw new Error('Not enough users to create a battle round');
    }
  
    for (let i = 0; i < users.length; i += 2) {
      const user1 = users[i];
      const user2 = users[i + 1] || null;
  
      if (user2) {
        const battle = new Battle();
        battle.user1 = user1;
        battle.user2 = user2;
        await this.battleRepository.save(battle);
  
        const user1Cards = await this.battleCardRepository.find({ where: { user: user1 } });
        for (const card of user1Cards) {
          card.battle = battle; 
          await this.battleCardRepository.save(card);
        }
  

        const user2Cards = await this.battleCardRepository.find({ where: { user: user2 } });
        for (const card of user2Cards) {
          card.battle = battle;  
          await this.battleCardRepository.save(card); 
        }
      }
    }
  
    return 'Battle round created successfully';
  }
  async processBattleOutcomes(): Promise<string> {
    const battles = await this.battleRepository.find({ where: { isCompleted: false }, relations: ['user1', 'user2', 'winner'] });
  
    let result = '';
  
    for (const battle of battles) {
      const winner = Math.random() > 0.5 ? battle.user1 : battle.user2;
  
      battle.winner = winner;
      battle.isCompleted = true;
      await this.battleRepository.save(battle);
  
      result += `Battle ID: ${battle.id}, Winner: ${winner.username}\n`;
    }
  
    return result || 'No battles to process';
  }
}