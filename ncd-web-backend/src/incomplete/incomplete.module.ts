import { Module } from '@nestjs/common';
import { IncompleteService } from './incomplete.service';
import { IncompleteController } from './incomplete.controller';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports:[HttpModule],
  controllers: [IncompleteController],
  providers: [IncompleteService],
})
export class IncompleteModule {}
