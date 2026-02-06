"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComicsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comic_entity_1 = require("./entities/comic.entity");
const episode_entity_1 = require("./entities/episode.entity");
let ComicsService = class ComicsService {
    comicRepository;
    episodeRepository;
    constructor(comicRepository, episodeRepository) {
        this.comicRepository = comicRepository;
        this.episodeRepository = episodeRepository;
    }
    async create(createComicDto, user) {
        const newComic = this.comicRepository.create({
            ...createComicDto,
            author: user.userId,
        });
        return await this.comicRepository.save(newComic);
    }
    async createEpisode(comicId, episodeData) {
        const episode = this.episodeRepository.create({
            ...episodeData,
            comic: { id: comicId }
        });
        return await this.episodeRepository.save(episode);
    }
    async findAll() {
        return await this.comicRepository.find({
            relations: ['author'],
            order: { createdAt: 'DESC' }
        });
    }
    async findOne(id) {
        const comic = await this.comicRepository.findOne({
            where: { id },
            relations: ['author', 'episodes']
        });
        if (!comic) {
            throw new common_1.NotFoundException(`Comic con ID ${id} no encontrado`);
        }
        return comic;
    }
    async findEpisodeById(id) {
        return await this.episodeRepository.findOne({
            where: { id },
            relations: ['comments', 'comments.user'],
        });
    }
};
exports.ComicsService = ComicsService;
exports.ComicsService = ComicsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comic_entity_1.Comic)),
    __param(1, (0, typeorm_1.InjectRepository)(episode_entity_1.Episode)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ComicsService);
//# sourceMappingURL=comics.service.js.map