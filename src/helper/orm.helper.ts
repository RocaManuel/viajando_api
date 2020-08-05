import { User } from "../../src/entity/User";
import { UserInterface, Params } from "../../src/interfaces/User.interface";

export class ORMHelper {

  public formatParamsForWhere(params: any) {
    const response = { where: {} };
    // tslint:disable-next-line: forin
    for (const param in params) {
        response.where = { ...response.where, [param]: params[param] }
    }
    return response;
  }

  public getUserWithEntity(params: Params) {
    const user: any = new User();
    // tslint:disable-next-line: forin
    for (const param  in params) {
      user[param] = params[param];
    }
    return user;
  }

  public getUserBasics(params: Params) {
    const user = {
      created_at: new Date(),
      is_driver: false,
      is_email_verified: false,
      is_user_verified: false,
      last_seen_at: new Date(),
      profile_picture: '',
      second_step_auth: false
    }
    return { ...user, ...params };
  }
}