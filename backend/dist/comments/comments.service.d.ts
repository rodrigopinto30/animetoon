import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
export declare class CommentsService {
    private readonly commentRepository;
    constructor(commentRepository: Repository<Comment>);
    create(content: string, userId: string, episodeId: string, parentId?: string): Promise<Comment[]>;
    findByEpisode(episodeId: string): Promise<Comment[]>;
    remove(commentId: string, userId: string): Promise<Comment>;
}
