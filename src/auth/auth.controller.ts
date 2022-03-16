import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // Post signup
  // Post signin
  // Post signout
  // Protected route
}
