import { Module } from '@nestjs/common';
import { MusicalService } from './musical.service';
import { MusicalController } from './musical.controller';

@Module({
  providers: [MusicalService],
  controllers: [MusicalController]
})
export class MusicalModule {}
