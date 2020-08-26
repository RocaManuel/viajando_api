import { Router, Request } from "express";
import { Auth } from "../guardians/auth";
import { ParamsHelper } from "../helper/params.helper";
import { Response } from 'express';
import bodyParser from "body-parser";
// tslint:disable-next-line: no-var-requires
const mercadopago = require('mercadopago');

class PaymentController {

  public router: Router;
  private auth = new Auth();
  private paramsHelper = new ParamsHelper();
  private jsonParser = bodyParser.json();

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post('/checkout', this.jsonParser, this.auth.authenticateToken ,this.paramsHelper.validateParams, (req: any, res: Response) => this.processPayment(req, res));
  }

  private async processPayment(req: Request, res: Response) {
    try {
      mercadopago.configure({
        sandbox: true,
        access_token: process.env.MELI_TOKEN
      });
      const response = await mercadopago.payment.save(req.body);
      res.status(200).json({ success: true, message: 'payment approved' });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  }

}

const paymentController = new PaymentController();
export default paymentController.router;