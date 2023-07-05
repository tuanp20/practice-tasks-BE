import { Injectable, NotFoundException } from '@nestjs/common';
// import { TasksRepository } from './tasks.repository';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schemas/task.schema';
import { TASK_STATUS } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async getById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const res = await this.taskModel.create(createTaskDto);
    return res;
  }

  async updateStatus(id: string, status: TASK_STATUS): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException();
    } else {
      task.status = status;
    }
    return task;
  }

  async update(id: string, task: Task): Promise<Task> {
    const result = this.getById(id);
    if (!result) {
      throw new NotFoundException('Not Found');
    } else {
      await this.taskModel.findByIdAndUpdate(id, task, {
        new: true,
        runValidators: true,
      });
    }
    return result;
  }

  async delete(id: string): Promise<string> {
    const result = this.getById(id);
    if (!result) {
      throw new NotFoundException('Not found');
    } else {
      await this.taskModel.findByIdAndDelete(id);
      return 'Success!';
    }
  }
}
