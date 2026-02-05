import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComicsService } from './comics.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.AUTHOR, Role.ADMIN) 
  @Post()
  async create(@Body() createComicDto: any, @Request() req) {
    return this.comicsService.create(createComicDto, req.user);
  }
}