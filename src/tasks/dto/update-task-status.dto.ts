import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) // Careful, there's also IS_ENUM, isEnum...
  status: TaskStatus;
}
