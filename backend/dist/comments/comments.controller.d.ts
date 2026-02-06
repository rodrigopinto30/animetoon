import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(episodeId: string, content: string, parentId: string, req: any): Promise<import("./entities/comment.entity").Comment[]>;
    findAll(episodeId: string): Promise<import("./entities/comment.entity").Comment[]>;
    remove(id: string, req: any): Promise<import("./entities/comment.entity").Comment>;
}
