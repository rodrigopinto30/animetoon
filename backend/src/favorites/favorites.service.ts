import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async toggleFavorite(userId: string, comicId: string) {
    
    const existing = await this.favoriteRepository.findOne({
      where: { 
        user: { id: userId }, 
        comic: { id: comicId } 
      },
    });

    if (existing) {
      await this.favoriteRepository.remove(existing);
      return { favorited: false };
    } else {
      const newFavorite = this.favoriteRepository.create({
        user: { id: userId },
        comic: { id: comicId },
      });
      await this.favoriteRepository.save(newFavorite);
      return { favorited: true };
    }
  }

  async getUserFavorites(userId: string) {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['comic', 'comic.author'],
      order: { createdAt: 'DESC' }
    });

    return favorites.map((fav: any) => {
      if (!fav.comic) return null;
      
      return {
        id: fav.comic.id,
        title: fav.comic.title,
        description: fav.comic.description,
        coverImage: fav.comic.coverImage,
        genre: fav.comic.genre,
        favoriteId: fav.id,
        createdAt: fav.createdAt
      };
    }).filter(item => item !== null);
  }

}