import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Comic } from './entities/comic.entity';
import { Episode } from './entities/episode.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Role } from 'src/auth/enums/roles.enum';

@Injectable()
export class ComicsService {
  constructor(
    @InjectRepository(Comic) private readonly comicRepository: Repository<Comic>,
    @InjectRepository(Episode) private readonly episodeRepository: Repository<Episode>,
    @InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>
  ) {}

  async create(createComicDto: any, user: any) {
    const newComic = this.comicRepository.create({
      ...createComicDto,
      author: user.userId, 
    });
    return await this.comicRepository.save(newComic);
  }

  async createEpisode(comicId: string, episodeData: any) {
    const episode = this.episodeRepository.create({
      ...episodeData,
      comic: { id: comicId }
    });
    return await this.episodeRepository.save(episode);
  }

  async findOne(id: string, userId?: string) {
    
    const comic = await this.comicRepository.findOne({
      where: { id },
      relations: ['episodes'],
      order: { episodes: { number: 'ASC' } }
    });

    if (!comic) throw new NotFoundException('Comic no encontrado');

    let isFavorite = false;

    if (userId) {
      const favorite = await this.favoriteRepository.findOne({
        where: {
          user: { id: userId },
          comic: { id: id }
        }
      });
      
      isFavorite = !!favorite;
    }

    return {
      ...comic,
      isFavorite
    };
  }
  async findEpisodeById(id: string) {
    return await this.episodeRepository.findOne({
      where: { id },
      relations: ['comments', 'comments.user'], 
    });
  }

  async findAll(title?: string, genre?: string, page: number = 1, limit: number = 10) {
    const query = this.comicRepository.createQueryBuilder('comic')
      .leftJoinAndSelect('comic.author', 'author'); 

    if (title) {
      query.andWhere('comic.title LIKE :title', { title: `%${title}%` });
    }

    if (genre) {
      query.andWhere('comic.genre = :genre', { genre });
    }

    const skip = (page - 1) * limit;

    query.orderBy('comic.createdAt', 'DESC')
      .take(limit)
      .skip(skip);

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    }
  }

async remove(id: string, user: any) {
    const comic = await this.comicRepository.findOne({ 
      where: { id },
      relations: ['author']
    });

    if (!comic) {
      throw new NotFoundException('Cómic no encontrado');
    }

    if (comic.author.id !== user.userId && user.role !== Role.ADMIN) {
      throw new ForbiddenException('No tienes permiso para eliminar este cómic');
    }

    await this.comicRepository.remove(comic);
    return { message: 'Cómic eliminado con éxito' };
  }
}