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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
const typeorm_1 = require("typeorm");
const comic_entity_1 = require("./comic.entity");
const comment_entity_1 = require("../../comments/entities/comment.entity");
let Episode = class Episode {
    id;
    title;
    number;
    isFree;
    price;
    comic;
    comments;
    createdAt;
};
exports.Episode = Episode;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Episode.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Episode.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Episode.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Episode.prototype, "isFree", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Episode.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comic_entity_1.Comic, (comic) => comic.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", comic_entity_1.Comic)
], Episode.prototype, "comic", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.episode),
    __metadata("design:type", Array)
], Episode.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Episode.prototype, "createdAt", void 0);
exports.Episode = Episode = __decorate([
    (0, typeorm_1.Entity)('episodes')
], Episode);
//# sourceMappingURL=episode.entity.js.map