import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Role } from '../../auth/enums/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) 
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.READER,
  })
  role: Role;

  @Column({ type: 'int', default: 0 })
  coins: number;

  @CreateDateColumn()
  createdAt: Date;
}