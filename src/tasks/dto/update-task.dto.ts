import { IsNotEmpty } from 'class-validator';
import { TASK_STATUS } from '../task-status.enum';

export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: TASK_STATUS;
}
