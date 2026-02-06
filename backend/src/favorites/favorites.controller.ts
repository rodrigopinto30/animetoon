import { Controller, Post, Get, Param, UseGuards, Request, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':comicId')
  async toggle(@Param('comicId') comicId: string, @Request() req) {
    return this.favoritesService.toggleFavorite(req.user.userId, comicId);
  }

  @Get()
  async findAll(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.userId);
  }
}