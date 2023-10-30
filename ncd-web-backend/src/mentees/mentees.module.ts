import { Module } from '@nestjs/common';
import { MenteesService } from './mentees.service';
import { MenteesController } from './mentees.controller';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports:[HttpModule],
  controllers: [MenteesController],
  providers: [MenteesService],
  exports:[MenteesService]
})
export class MenteesModule {}
