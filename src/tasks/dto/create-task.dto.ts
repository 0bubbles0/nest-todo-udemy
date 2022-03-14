import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty() // Server-side Validation for title
  title: string;

  @IsNotEmpty() // Server-side Validation for description
  description: string;
}
