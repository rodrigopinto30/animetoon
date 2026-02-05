import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module'; 
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ComicsModule } from './comics/comics.module';
 import { Comic } from './comics/entities/comic.entity'; 
 
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
        entities: [User, Comic], 
        synchronize: true, 
        logging: true, 
        logger: 'advanced-console',
        autoLoadEntities: true
      }),
    }),
    UsersModule,
    AuthModule,
    ComicsModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('--- APP MODULE CARGADO Y CONECTANDO A DB ---');
  }
}