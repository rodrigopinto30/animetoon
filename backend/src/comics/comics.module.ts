import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comic } from './entities/comic.entity';
import { ComicsService } from './comics.service';
import { ComicsController } from './comics.controller';
import { Episode } from './entities/episode.entity';
import { PassportModule } from '@nestjs/passport'; 
import { JwtOptionalGuard } from '../auth/guards/jwt-optional.guard';
import { Favorite } from '../favorites/entities/favorite.entity'; 
import { Page } from './entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comic, Episode, Favorite, Page]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
],
  providers: [ComicsService, JwtOptionalGuard],
  controllers: [ComicsController],
  exports: [ComicsService]
})
export class ComicsModule {}