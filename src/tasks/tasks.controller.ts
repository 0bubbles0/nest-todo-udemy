import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  // for "/tasks/:id/"
  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createDto);
  }

  /* Too specific:
  @Post()
  createTask(
    @Body("title") title: string,
    @Body("description") description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }

  // Chunky:
  @Post()
  createTask(@Body() body): void {
    console.log("body: ", body);
  }
  */

  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("status") status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
