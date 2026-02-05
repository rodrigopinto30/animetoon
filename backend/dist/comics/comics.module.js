"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComicsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comic_entity_1 = require("./entities/comic.entity");
const comics_service_1 = require("./comics.service");
const comics_controller_1 = require("./comics.controller");
let ComicsModule = class ComicsModule {
};
exports.ComicsModule = ComicsModule;
exports.ComicsModule = ComicsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([comic_entity_1.Comic])],
        providers: [comics_service_1.ComicsService],
        controllers: [comics_controller_1.ComicsController],
    })
], ComicsModule);
//# sourceMappingURL=comics.module.js.map