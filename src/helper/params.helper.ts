
export class ParamsHelper {

  public getUserParams(type: string) {
    switch(type) {
      case 'register':
        return this.userRegisterParams();
      case 'login':
        return this.userLoginParams();
    }
  }


  private userRegisterParams() {
    return [ '' ]
  }

  private userLoginParams() {
    return ['email', 'password'];
  }
}