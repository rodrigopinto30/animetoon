import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module'; 
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ComicsModule } from './comics/comics.module';
 import { Comic } from './comics/entities/comic.entity'; 
import { Episode } from './comics/entities/episode.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { FavoritesModule } from './favorites/favorites.module';
import { RatingsModule } from './ratings/ratings.module';
import { NotificationsModule } from './notifications/notifications.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: 'db',
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [User, Comic, Episode, Comment], 
        synchronize: true, 
        logging: true, 
        logger: 'advanced-console',
        autoLoadEntities: true
      }),
    }),
    UsersModule,
    AuthModule,
    ComicsModule,
    CommentsModule,
    FavoritesModule,
    RatingsModule,
    NotificationsModule,
  ],
})
export class AppModule {
}