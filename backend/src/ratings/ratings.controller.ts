import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':comicId')
  async rate(
    @Param('comicId') comicId: string,
    @Body('score') score: number,
    @Request() req,
  ) {
    return this.ratingsService.createOrUpdate(req.user.userId, comicId, score);
  }

  @Get('comic/:comicId')
  async getAverage(@Param('comicId') comicId: string) {
    return this.ratingsService.getAverage(comicId);
  }
}