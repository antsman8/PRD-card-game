import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  rarity: string; 

  @Column()
  power: number; 
}