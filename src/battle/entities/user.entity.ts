import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Battle } from './battle.entity';
import { BattleCard } from './battleCard.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ type: 'decimal', default: 0 })
  balance_usd: number;

  @OneToMany(() => Battle, (battle) => battle.user1)
  battlesAsUser1: Battle[];

  @OneToMany(() => Battle, (battle) => battle.user2)
  battlesAsUser2: Battle[];

  @OneToMany(() => BattleCard, (battleCard) => battleCard.user)
  battleCards: BattleCard[]; 
}