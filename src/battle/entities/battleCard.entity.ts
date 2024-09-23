import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Battle } from './battle.entity';
import { User } from './user.entity';
import { Card } from './card.entity';

@Entity()
export class BattleCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Battle, (battle) => battle.battleCards)  
  @JoinColumn({ name: 'battle_id' })
  battle: Battle;

  @ManyToOne(() => User, (user) => user.battleCards) 
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Card) 
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column({ type: 'int' })
  lane: number;
}
