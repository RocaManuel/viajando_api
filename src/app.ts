import express = require('express');
import UsersController from './controllers/users';

export class App {

  app: express.Application = express();

  public getApp() {
    this.setRoutes();
    this.app.use(this.getCORS());
    return this.app;
  }

  private getCORS() {
    return (req: any, res: express.Response, next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

      // intercept OPTIONS method
      if ('OPTIONS' === req.method) {
        res.send(200);
      }
      else {
        next();
      }
    }
  }

  private setRoutes() {
    this.app.get('/health-checks', (req, res) => res.status(200).json({ success: true }));
    this.app.use('/api/v1/users', UsersController);
  }
}
