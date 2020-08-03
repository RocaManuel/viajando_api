import { Router, Response } from "express";
import { Auth } from "../guardians/auth";
import t = require('terminal-kit');

class UsersController {
  private auth = new Auth();
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get('/', (req: any, res: Response) => this.login(req, res))
  }

  private async login(req: any, res: Response) {
    try {
    } catch (e) {
    }
  }
}

const userController = new UsersController();
export default userController.router;