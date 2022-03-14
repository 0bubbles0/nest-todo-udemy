import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty() // Validation for title
  title: string;

  @IsNotEmpty() // Validation for description
  description: string;
}
