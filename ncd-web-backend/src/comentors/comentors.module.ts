import { Module } from '@nestjs/common';
import { ComentorsService } from './comentors.service';
import { ComentorsController } from './comentors.controller';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports:[HttpModule],
  controllers: [ComentorsController],
  providers: [ComentorsService],
})
export class ComentorsModule {}
