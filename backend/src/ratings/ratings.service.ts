import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async createOrUpdate(userId: string, comicId: string, score: number) {
    let rating = await this.ratingRepository.findOne({
      where: { user: { id: userId }, comic: { id: comicId } },
    });

    if (rating) {
      rating.score = score;
    } else {
      rating = this.ratingRepository.create({
        user: { id: userId },
        comic: { id: comicId },
        score,
      });
    }

    await this.ratingRepository.save(rating);
    
    return { message: 'Rating saved', score: rating.score };
  }

  async getAverage(comicId: string) {
    const result = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('AVG(rating.score)', 'average')
      .where('rating.comicId = :comicId', { comicId })
      .getRawOne();

    return {
      average: parseFloat(result.average) || 0,
    };
  }
}