import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus) // Validation
  status?: TaskStatus;

  @IsOptional()
  @IsString() // Validation
  search?: string;
}
