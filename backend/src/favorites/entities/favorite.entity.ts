import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comic } from '../../comics/entities/comic.entity';

@Entity('favorites')
@Unique(['user', 'comic'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Comic, (comic) => comic.id, { onDelete: 'CASCADE' })
  comic: Comic;

  @CreateDateColumn()
  createdAt: Date;
}