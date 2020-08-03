import { Request, Response, NextFunction } from "express";

export class Auth {
  public requireUser(req: Request, res: Response, next: NextFunction) {
    return next();
  }
}