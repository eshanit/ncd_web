import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { ScoresModule } from './scores/scores.module';
import { UserModule } from './user/user.module';
import { MenteesModule } from './mentees/mentees.module';
import { MentorsModule } from './mentors/mentors.module';
import { ComentorsModule } from './comentors/comentors.module';
import { DistrictsModule } from './districts/districts.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { EvaluatorsModule } from './evaluators/evaluators.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { IncompleteModule } from './incomplete/incomplete.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ScoresModule, UserModule, MenteesModule, MentorsModule, ComentorsModule, DistrictsModule, FacilitiesModule, EvaluatorsModule, EvaluationsModule, IncompleteModule],
  providers: [],
})
export class AppModule {}
