import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { NotificationsService } from '../notifications/notifications.service'; 
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly notificationsService: NotificationsService,
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

    const comment = await this.commentRepository.save(
      this.commentRepository.create(commentData)
    );

    if (parentId) {
      const parent = await this.commentRepository.findOne({
        where: { id: parentId },
        relations: ['user'],
      });

      if (parent && parent.user.id !== userId) {
        await this.notificationsService.createNotification(
          parent.user.id,
          `Alguien respondió a tu comentario en el episodio.`,
          'reply'
        );
      }
    }

    return comment;
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