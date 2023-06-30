import { Column, Entity } from 'typeorm';
import { TASK_STATUS } from './task-status.enum';

@Entity()
export class Task {
  @Column()
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TASK_STATUS;
}
