import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(content: string, userId: string, episodeId: string, parentId?: string) {

      const commentData: any = {
      content,
      user: { id: userId },
      episode: { id: episodeId },
      parentComment: parentId ? { id: parentId } : null,
    };

    if (parentId) {
      commentData.parentComment = { id: parentId };
    }

    const comment = this.commentRepository.create(commentData);
    return await this.commentRepository.save(comment);
  }

  async findByEpisode(episodeId: string) {
    return await this.commentRepository.find({
      where: { episode: { id: episodeId }, parentComment: IsNull() },
      relations: ['user', 'replies', 'replies.user'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(commentId: string, userId: string) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('El comentario no existe');
    }

    if (comment.user.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para borrar este comentario');
    }

    return await this.commentRepository.remove(comment);
  }

}