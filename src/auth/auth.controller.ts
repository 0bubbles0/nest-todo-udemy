import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // Post to Route /auth/signup
  @Post("/signup")
  SignUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  // Post signin
  // Post signout
  // Protected route
}
