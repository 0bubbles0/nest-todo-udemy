import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // Password: encrypt, hash, salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store in database
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);

      // Validate & Error handling: empty, requirements (username unique, password length/numbersSymbols), error code/message/action
    } catch (error) {
      // this pg error.code is for username duplication error:
      if (error.code == "23505") {
        throw new ConflictException("Username already exists");
      } else {
        throw new InternalServerErrorException();
      }
      // Better error handling: define error enum, handle in service
    }
  }
}
