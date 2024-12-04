import { Module } from '@nestjs/common';
import { GyerekekService } from './gyerekek.service';
import { GyerekekController } from './gyerekek.controller';
import { PrismaService } from 'src/prisma.service';
import { JatekokService } from 'src/jatekok/jatekok.service';

@Module({
  controllers: [GyerekekController],
  providers: [GyerekekService, PrismaService, JatekokService],
})
export class GyerekekModule {}
