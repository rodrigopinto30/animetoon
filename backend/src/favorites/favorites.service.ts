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
      where: { user: { id: userId }, comic: { id: comicId } },
    });

    if (existing) {
      await this.favoriteRepository.remove(existing);
      return { added: false };
    }

    const newFavorite = this.favoriteRepository.create({
      user: { id: userId },
      comic: { id: comicId },
    });
    
    await this.favoriteRepository.save(newFavorite);
    return { added: true };
  }

  async getUserFavorites(userId: string) {
    return await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['comic'], 
    });
  }
}