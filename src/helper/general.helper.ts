
export class GeneralHelper {

  public validateRequiredParams(params: any, requiredParams: any) {
    for (const param of requiredParams) {
      if (!params[param] || params[param] === '') {
        return false;
      }
    }
    return true;
  }
}