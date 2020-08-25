import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import fs from 'fs';

export class Auth {

  public async generateToken(params: any) {
    const privateKEY = process.env.TOKEN_SECURE_KEY
    const tokenOpts: SignOptions = {
      issuer: 'WORKSTATION',
      subject: 'rocamanuelignacio@gmail.com',
      audience: 'http://work-station.notreally.com',
      expiresIn: "12h",
      algorithm: "RS256"
    };
    return jsonwebtoken.sign(params, privateKEY, tokenOpts);
  }

  public async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const privateKEY = process.env.TOKEN_SECURE_KEY
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401);
    const tokenOpts: VerifyOptions = {
      issuer: 'WORKSTATION',
      subject: 'rocamanuelignacio@gmail.com',
      audience: 'http://work-station.notreally.com',
      algorithms: [ "RS256" ]
    };
    jsonwebtoken.verify(token, privateKEY, tokenOpts, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user_id = user.id;
      next()
    })
  }

}