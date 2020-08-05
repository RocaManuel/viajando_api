import { Router, Response } from "express";
import { Auth } from "../guardians/auth";
import telkit from 'terminal-kit';
import bodyParser from 'body-parser';
import { UsersSerivce } from "../../src/services/Users.service";
import { ORMHelper } from "../../src/helper/orm.helper";
import { GeneralHelper } from "../../src/helper/general.helper";

class UsersController {

  private auth = new Auth();
  private usersService = new UsersSerivce();
  private ormHelper = new ORMHelper();
  private generalHelper = new GeneralHelper();

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
      const params = this.ormHelper.formatParamsForWhere(req.query);
      const requiredParams = ['email', 'password'];
      if(!this.generalHelper.validateRequiredParams(req.query, requiredParams)) return res.status(400).json({ error: 'missing params' });
      const response = await this.usersService.getUser(params);
      if (!response) res.status(404).json({ error: 'not user found' });
      return res.status(200).json({ auth: true, response });
    } catch (e) {
      telkit.terminal(e);
    }
  }

  private async register(req: any, res: Response) {
    try {
      const params = this.ormHelper.getUserBasics(req.body);
      const user = this.ormHelper.getUserWithEntity(params);
      const response = await this.usersService.postUser(user);
      return res.status(200).json({ success: true });
    } catch (e) {
      telkit.terminal(e);
    }
  }
}

const userController = new UsersController();
export default userController.router;