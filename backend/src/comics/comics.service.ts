import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comic } from './entities/comic.entity';
import { Episode } from './entities/episode.entity';

@Injectable()
export class ComicsService {
  constructor(
    @InjectRepository(Comic) private readonly comicRepository: Repository<Comic>,
    @InjectRepository(Episode) private readonly episodeRepository: Repository<Episode>,
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

  async findAll(): Promise<Comic[]>{
    return await this.comicRepository.find({
      relations: ['author'],
      order: {createdAt: 'DESC'}
    })
  }

  async findOne(id: string): Promise<Comic>{
    const comic = await this.comicRepository.findOne({
      where: {id},
      relations: ['author', 'episodes']
    });

    if(!comic){
      throw new NotFoundException(`Comic con ID ${id} no encontrado`);
    }

    return comic;
  }

  async findEpisodeById(id: string) {
    return await this.episodeRepository.findOne({
      where: { id },
      relations: ['comments', 'comments.user'], 
    });
  }
}