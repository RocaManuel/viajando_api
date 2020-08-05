
export class ORMHelper {

  public formatParamsForWhere(params: any) {
    const response = { where: {} };
    // tslint:disable-next-line: forin
    for (const param in params) {
        response.where = { ...response.where, [param]: params[param] }
    }
    return response;
  }
}