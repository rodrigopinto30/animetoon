import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { Comic } from 'src/comics/entities/comic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Comic])],
  providers: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
