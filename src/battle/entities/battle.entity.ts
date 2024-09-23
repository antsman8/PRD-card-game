import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from './user.entity';
import { BattleCard } from './battleCard.entity';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.battlesAsUser1)
  user1: User;

  @ManyToOne(() => User, (user) => user.battlesAsUser2)
  user2: User;

  @ManyToOne(() => User, { nullable: true })
  winner: User;

  @OneToMany(() => BattleCard, (battleCard) => battleCard.battle)  
  battleCards: BattleCard[];

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;
}