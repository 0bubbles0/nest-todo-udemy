import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { AuthGuard } from "@nestjs/passport";

// On route "http://.../tasks/"
@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // On route "http://.../tasks/:id/"
  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    // Validation in Service
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createDto: CreateTaskDto): Promise<Task> {
    // Validation in DTO
    return this.tasksService.createTask(createDto);
  }

  // /* Too specific:
  // @Post()
  // createTask(
  //   @Body("title") title: string,
  //   @Body("description") description: string,
  // ): Task {
  //   return this.tasksService.createTask(title, description);
  // }

  // // Chunky:
  // @Post()
  // createTask(@Body() body): void {
  //   console.log("body: ", body);
  // }
  // */

  @Delete("/:id")
  deleteTask(@Param("id") id: string): Promise<void> {
    // Validation in Service
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() { status }: UpdateTaskStatusDto, // Validation in DTO & Service
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
