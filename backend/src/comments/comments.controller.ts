import { Delete, Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':episodeId')
  async create(
    @Param('episodeId') episodeId: string,
    @Body('content') content: string,
    @Body('parentId') parentId: string,
    @Request() req,
  ) {
    return this.commentsService.create(content, req.user.userId, episodeId, parentId);
  }

  @Get('episode/:episodeId')
  async findAll(@Param('episodeId') episodeId: string) {
    return this.commentsService.findByEpisode(episodeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(id, req.user.userId);
  }
}