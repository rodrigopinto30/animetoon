import { ComicsService } from './comics.service';
export declare class ComicsController {
    private readonly comicsService;
    constructor(comicsService: ComicsService);
    findAll(): Promise<import("./entities/comic.entity").Comic[]>;
    findOne(id: string): Promise<import("./entities/comic.entity").Comic>;
    create(createComicDto: any, req: any): Promise<import("./entities/comic.entity").Comic[]>;
    addEpisode(comicId: string, episodeData: any): Promise<import("./entities/episode.entity").Episode[]>;
    uploadPages(episodeId: string, files: Array<Express.Multer.File>): Promise<{
        message: string;
        paths: string[];
    }>;
    findEpisode(id: string): Promise<import("./entities/episode.entity").Episode | null>;
}
