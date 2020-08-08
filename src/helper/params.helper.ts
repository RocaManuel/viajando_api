import { NextFunction, Request, Response } from "express";
import { Params } from "../models/params.model";

export class ParamsHelper {

  public validateParams(req: Request, res: Response, next: NextFunction) {
    const requiredParams: any = Params[req.method][req.baseUrl];
    const params = req.method === 'GET' ? req.query : req.body;
    // tslint:disable-next-line: no-shadowed-variable
    const validateParams = (params: any, requiredParams: any) => {
      // tslint:disable-next-line: forin
      for (const param in requiredParams) {
        if (params[param] === 'undefined' || params[param] === 'null' || params[param] === '' || typeof params[param] !== requiredParams[param]) return false;
      }
      return true
    }
    if (!validateParams(params, requiredParams)) return res.status(400).json({ error: 'Missing params or type error' });
    next();
  }

}