import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports:[HttpModule],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
