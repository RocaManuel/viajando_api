import express = require('express');
import cors = require('cors');
import UsersController from './controllers/users';

export class App {

  app: express.Application = express();

  public getApp() {
    this.setRoutes();
    this.app.use(cors());
    return this.app;
  }

  private setRoutes() {
    this.app.get('/health-checks', (req, res) => res.status(200).json({ success: true }));
    this.app.use('/api/v1/users', UsersController);
  }
}
