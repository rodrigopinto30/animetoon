import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Episode } from './episode.entity';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  order: number; 

  @ManyToOne(() => Episode, (episode) => episode.pages, { onDelete: 'CASCADE' })
  episode: Episode;
}