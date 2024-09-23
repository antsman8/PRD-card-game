import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Card } from './entities/card.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedUsers();
    await this.seedCards();
  }

  private async seedUsers() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      const users = [
        { username: 'Player1', email: 'player1@example.com', balance_usd: 100 },
        { username: 'Player2', email: 'player2@example.com', balance_usd: 100 },
        { username: 'Player3', email: 'player3@example.com', balance_usd: 100 },
      ];
      await this.userRepository.save(users);
      console.log('Users seeded');
    }
  }

  private async seedCards() {
    const cardCount = await this.cardRepository.count();
    if (cardCount === 0) {
      const cards = [
        { name: 'Card1', rarity: 'Common', power: 10 },
        { name: 'Card2', rarity: 'Rare', power: 20 },
        { name: 'Card3', rarity: 'Epic', power: 30 },
        { name: 'Card4', rarity: 'Legendary', power: 40 },
      ];
      await this.cardRepository.save(cards);
      console.log('Cards seeded');
    }
  }
}