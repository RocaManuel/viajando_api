import { Router, Response } from "express";
import { Auth } from "../guardians/auth";
import telkit from 'terminal-kit';
import bodyParser from 'body-parser';
import { UsersSerivce } from "../services/Users.service";
import { ORMHelper } from "../helper/orm.helper";
import { GeneralHelper } from "../helper/general.helper";
import { ParamsHelper } from "../helper/params.helper";
import { CarsSerivce } from "../services/cars.service";
import { EncryptHelper } from "../helper/encrypt.helper";

class UsersController {

  private auth = new Auth();
  private jsonParser = bodyParser.json();

  private usersService = new UsersSerivce();
  private carsService = new CarsSerivce();

  private ormHelper = new ORMHelper();
  private generalHelper = new GeneralHelper();
  private paramsHelper = new ParamsHelper();
  private encryptionHelper = new EncryptHelper();

  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post('/session', this.jsonParser, this.paramsHelper.validateParams, (req: any, res: Response) => this.login(req, res));
    this.router.post('/register', this.jsonParser, this.paramsHelper.validateParams, (req: any, res: Response) => this.register(req, res));
    this.router.get('/cars', this.jsonParser, this.auth.authenticateToken, (req: any, res: Response) => this.getUserCars(req, res));
    this.router.get('/trips', this.jsonParser, this.auth.authenticateToken, (req: any, res: Response) => this.login(req, res));
  }

  private async login(req: any, res: Response) {
    try {
      const params = this.ormHelper.formatParamsForWhere(req.body);
      params.where.password = await this.encryptionHelper.encryptPassword(req.body.password);
      const response = await this.usersService.getUser(params);
      if (!response) res.status(404).json({ error: 'not user found' });

      const { name, lastname, id } = response;
      const token = await this.auth.generateToken({ name, lastname, id });

      return res.status(200).json({ auth: true, response, token });
    } catch (e) {
      telkit.terminal(e);
    }
  }

  private async register(req: any, res: Response) {
    try {
      const user = await this.ormHelper.getUserBasics(req.body);
      const response = await this.usersService.postUser(user);
      const { name, lastname, id } = response;
      const token = await this.auth.generateToken({ name, lastname, id });
      return res.status(200).json({ success: true, token, response });
    } catch (e) {
      telkit.terminal(e);
    }
  }

  private async getUserCars(req: any, res: Response) {
    try {
      const id = req.user_id;
      const params = this.ormHelper.formatParamsForWhere({ driver_id: id });
      const response = await this.carsService.getUserCars(params);
      return res.status(200).json({ response });
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }

}

const userController = new UsersController();
export default userController.router;