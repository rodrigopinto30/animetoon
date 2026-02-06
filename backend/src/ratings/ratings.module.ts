import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Comic } from 'src/comics/entities/comic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Comic])],
  providers: [RatingsService],
  controllers: [RatingsController]
})
export class RatingsModule {}
