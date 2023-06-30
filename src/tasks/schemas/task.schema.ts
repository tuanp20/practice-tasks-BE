import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TASK_STATUS } from '../task-status.enum';

@Schema({ timestamps: true })
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TASK_STATUS;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
