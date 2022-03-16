import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  // A User has columns: username, password

  // Validation: shows error message to user
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  // Validation: shows error message to user
  @IsString()
  @MinLength(8, { message: "Your password must have a min 8 characters" })
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Your password must contain at least 1 Uppercase Letter, 1 lowercase letter and 1 number or special character",
  })
  password: string;
}
