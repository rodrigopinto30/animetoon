import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comic } from './entities/comic.entity';

@Injectable()
export class ComicsService {
  constructor(
    @InjectRepository(Comic)
    private readonly comicRepository: Repository<Comic>,
  ) {}

  async create(createComicDto: any, user: any) {
    const newComic = this.comicRepository.create({
      ...createComicDto,
      author: user.userId, 
    });
    return await this.comicRepository.save(newComic);
  }
}