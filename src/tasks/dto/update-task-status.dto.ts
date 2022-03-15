import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

// For validation
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) // Validation. Careful, there's also IS_ENUM, isEnum...
  status: TaskStatus;
}
