import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BattleModule } from './battle/battle.module';
import { User } from './battle/entities/user.entity';
import { Card } from './battle/entities/card.entity';
import { Battle } from './battle/entities/battle.entity';
import { BattleCard } from './battle/entities/battleCard.entity';
import { SeedService } from './battle/seed.service'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  
      envFilePath: '.env', 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [User, Card, Battle, BattleCard], 
        synchronize: true,  
      }),
    }),
    TypeOrmModule.forFeature([User, Card, BattleCard, Battle]),
    BattleModule, 
  ],
  providers: [SeedService],
})
export class AppModule {}