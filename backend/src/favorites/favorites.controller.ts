import { UnauthorizedException, Controller, Req, Post, Get, Param, UseGuards, Request, Delete,  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':comicId')
  async toggle(
    @Param('comicId') comicId: string,
    @Req() req: any,
  ) {
    const user = req.user;
    
    if (!user) throw new UnauthorizedException('Usuario no autenticado');

    const idUsuario = user.id || user.userId; 
    
    return this.favoritesService.toggleFavorite(idUsuario, comicId);
  }
  @Get()
  async findAll(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.userId);
  }
}