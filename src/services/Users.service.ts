import { getConnection } from "typeorm";
import { User } from "../../src/entity/User";
import telkit from 'terminal-kit';

export class UsersSerivce {


  public async getUser(params: any) {
    return await getConnection().manager.getRepository(User)
      .findOne(params);
  }

  public async postUser(params: User) {
    try {
      return await getConnection().manager.save(params);
    } catch(e) {
      telkit.terminal(e);
      return e;
    }
  }

}