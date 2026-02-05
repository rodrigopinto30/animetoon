import { ComicsService } from './comics.service';
export declare class ComicsController {
    private readonly comicsService;
    constructor(comicsService: ComicsService);
    create(createComicDto: any, req: any): Promise<import("./entities/comic.entity").Comic[]>;
}
