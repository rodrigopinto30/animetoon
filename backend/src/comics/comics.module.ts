import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comic } from './entities/comic.entity';
import { ComicsService } from './comics.service';
import { ComicsController } from './comics.controller';
import { Episode } from './entities/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comic, Episode])],
  providers: [ComicsService],
  controllers: [ComicsController],
})
export class ComicsModule {}