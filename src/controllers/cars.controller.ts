import telkit from 'terminal-kit';
import bodyParser from 'body-parser';
import { Router, Response } from "express";
import { Auth } from "../guardians/auth";
import { ORMHelper } from "../helper/orm.helper";
import { ParamsHelper } from "../helper/params.helper";
import { CarsSerivce } from "../services/cars.service";

class CarsController {

  private auth = new Auth();
  private jsonParser = bodyParser.json();

  private carService = new CarsSerivce();

  private ormHelper = new ORMHelper();
  private paramsHelper = new ParamsHelper();

  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get('/',  this.jsonParser, this.auth.authenticateToken, this.paramsHelper.validateParams, (req: any, res: Response) => this.getCarById(req, res));
    this.router.post('/', this.jsonParser, this.paramsHelper.validateParams, (req: any, res: Response) => this.createCar(req, res));
  }

  private async getCarById(req: any, res: Response) {
    try {
      const params = this.ormHelper.formatParamsForWhere(req.query);
      const response = await this.carService.getCar(params);
      return res.status(200).json({ response });
    } catch (e) {
      telkit.terminal(e);
    }
  }

  private async createCar(req: any, res: Response) {
    try {
      const car = this.ormHelper.getCarBasic(req.body);
      const response = await this.carService.createCar(car);
      return res.status(200).json({ success: true });
    } catch (e) {
      telkit.terminal(e);
    }
  }

}

const carsController = new CarsController();
export default carsController.router;