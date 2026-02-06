
import { Get, Controller, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComicsService } from './comics.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.AUTHOR, Role.ADMIN, Role.READER)
    @Get() 
    async findAll() {
      return this.comicsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.comicsService.findOne(id)
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.AUTHOR, Role.ADMIN) 
  @Post()
  async create(@Body() createComicDto: any, @Request() req) {
    return this.comicsService.create(createComicDto, req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.AUTHOR)
  @Post(':id/episodes')
  async addEpisode(@Param('id') comicId: string, @Body() episodeData: any) {
    return this.comicsService.createEpisode(comicId, episodeData);
  }

  @Post('episodes/:id/pages')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.AUTHOR)
  @UseInterceptors(FilesInterceptor('pages', 20, {
    storage: diskStorage({
      destination: './uploads/episodes',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${req.params.id}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadPages(
    @Param('id') episodeId: string, 
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    
    console.log('Archivos recibidos:', files); 
  
    if (!files || files.length === 0) {
      return { message: 'No se recibieron archivos. Revisa el campo "pages" en Postman', paths: [] };
    }
    const paths = files.map(file => file.path);
    return {
      message: 'Imágenes subidas con éxito',
      paths: paths
    };
  }

 @UseGuards(AuthGuard('jwt'))
  @Get('episodes/:id')
  async findEpisode(@Param('id') id: string) {
    return this.comicsService.findEpisodeById(id);
  }
}