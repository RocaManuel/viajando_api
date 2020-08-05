import { getConnection } from "typeorm";
import { User } from "../../src/entity/User";
import telkit from 'terminal-kit';

export class UsersSerivce {

  public async getUsers() {
    return await getConnection().manager.getRepository(User)
      .findOne({
        where: { id: 1 }
      });
  }

  public async getUser(password: string, email: string) {
    return await getConnection().manager.getRepository(User)
      .findOne({
        where: { email, password }
      });
  }

  public async postUser(params: any) {
    try {
      const user = new User();
      user.country = params.country;
      user.created_at = new Date();
      user.email = params.email;
      user.is_driver = params.isDriver;
      user.is_email_verified = params.isEmailVerified;
      user.lastname = params.lastName;
      user.last_seen_at = new Date();
      user.location = params.location;
      user.name = params.firstName;
      user.password = params.password;
      user.profile_picture = params.profilePicture;
      user.rate = params.rate;
      user.second_step_auth = params.secondStepAuth;
      user.tel = params.tel;
      return await getConnection().manager.save(user);
    } catch(e) {
      telkit.terminal(e);
      return e;
    }
  }

}