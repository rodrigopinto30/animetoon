import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Comic } from './comic.entity';
import { Comment } from '../../comments/entities/comment.entity'; 

@Entity('episodes')
export class Episode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'int' })
  number: number; 

  @Column({ default: false })
  isFree: boolean;

  @Column({ type: 'int', default: 0 })
  price: number; 

  @ManyToOne(() => Comic, (comic) => comic.id, { onDelete: 'CASCADE' })
  comic: Comic;

  @OneToMany(() => Comment, (comment) => comment.episode)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}