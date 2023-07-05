import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getAllTask(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getById(id);
  }

  @Post()
  async createTask(@Body() task): Promise<Task> {
    return this.taskService.create(task);
  }

  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusTaskDto: UpdateStatusTaskDto,
  ) {
    const { status } = updateStatusTaskDto;
    return this.taskService.updateStatus(id, status);
  }

  @Put('/:id/update')
  async update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.taskService.update(id, task);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.taskService.delete(id);
  }
}
