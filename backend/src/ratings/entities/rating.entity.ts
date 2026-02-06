import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, Check } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comic } from '../../comics/entities/comic.entity';

@Entity('ratings')
@Unique(['user', 'comic']) 
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  @Check(`"score" >= 1 AND "score" <= 5`) 
  score: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Comic, (comic) => comic.id, { onDelete: 'CASCADE' })
  comic: Comic;
}