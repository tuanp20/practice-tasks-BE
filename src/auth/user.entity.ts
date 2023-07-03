import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
