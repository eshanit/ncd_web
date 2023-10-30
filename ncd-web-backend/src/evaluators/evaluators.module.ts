import { Module } from '@nestjs/common';
import { EvaluatorsService } from './evaluators.service';
import { EvaluatorsController } from './evaluators.controller';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports:[HttpModule],
  controllers: [EvaluatorsController],
  providers: [EvaluatorsService],
})
export class EvaluatorsModule {}
