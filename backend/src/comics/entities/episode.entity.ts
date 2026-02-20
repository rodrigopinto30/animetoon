import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Comic } from './comic.entity';
import { Comment } from '../../comments/entities/comment.entity'; 
import { Page } from './page.entity';

@Entity('episodes')
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  isFree: boolean;

  @Column({ type: 'int', default: 0 })
  price: number;

  @ManyToOne(() => Comic, (comic: Comic) => comic.id, { onDelete: 'CASCADE' })
  comic: Comic;

  @OneToMany(() => Page, (page: Page) => page.episode, { cascade: true })
  pages: Page[];

  @OneToMany(() => Comment, (comment: Comment) => comment.episode)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}