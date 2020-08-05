import { Router, Response } from "express";
import { Auth } from "../guardians/auth";
import telkit from 'terminal-kit';
import bodyParser from 'body-parser';
import { UsersSerivce } from "../../src/services/Users.service";

class UsersController {
  private auth = new Auth();
  private usersService = new UsersSerivce();
  router: Router;

  private jsonParser = bodyParser.json();
  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get('/', (req: any, res: Response) => this.login(req, res));
    this.router.post('/', this.jsonParser, (req: any, res: Response) => this.register(req, res));
  }

  private async login(req: any, res: Response) {
    try {
      const { email, password } = req.query;
      const response = await this.usersService.getUser(password, email);
      if (!response) res.status(404).json({ error: 'not user found' });
      return res.status(200).json({ auth: true, response });
    } catch (e) {
      telkit.terminal(e);
    }
  }

  private async register(req: any, res: Response) {
    try {
      const params = req.body;
      telkit.terminal(req.body);
      const response = await this.usersService.postUser(params);
      return res.status(200).json({ success: true });
    } catch (e) {
      telkit.terminal(e);
    }
  }
}

const userController = new UsersController();
export default userController.router;