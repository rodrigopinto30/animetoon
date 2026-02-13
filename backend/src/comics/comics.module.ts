import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comic } from './entities/comic.entity';
import { ComicsService } from './comics.service';
import { ComicsController } from './comics.controller';
import { Episode } from './entities/episode.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { PassportModule } from '@nestjs/passport'; 
import { JwtOptionalGuard } from '../auth/guards/jwt-optional.guard';
@Module({
  imports: [TypeOrmModule.forFeature([Comic, Episode, Favorite]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
],
  providers: [ComicsService, JwtOptionalGuard],
  controllers: [ComicsController],
  exports: [ComicsService]
})
export class ComicsModule {}