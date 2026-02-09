import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column({ default: 'reply' })
  type: string;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  recipient: User; 

  @CreateDateColumn()
  createdAt: Date;
}