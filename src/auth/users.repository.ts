import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // validate: empty, requirements (username unique, password length/numbersSymbols), error code/message/action

    // password: encrypt, hash, salt
    // store in database
    const user = this.create({ username, password });
    await this.save(user);
  }
}
