import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { UsersRepository } from "./users.repository";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    /*
    // confirmUser
    const user = await this.usersRepository.validateUser(authCredentialsDto);
    // startSession
    */

    // Tutorial:
    const { username, password } = authCredentialsDto;

    // Find user
    const user = await this.usersRepository.findOne({ username });

    // compare passwords
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken }; // It's Common Practice to put it into an object
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }
}
