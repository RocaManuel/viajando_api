import cors from 'cors';
import express from "express";
import UsersController from './controllers/users.controller';
import TripsControllers from './controllers/trips.controller';
export class App {

  app: express.Application = express();

  public getApp() {
    this.app.use(cors());
    this.setRoutes();
    return this.app;
  }

  private setRoutes() {
    this.app.get('/health-checks', (req, res) => res.status(200).json({ success: true }));
    this.app.use('/api/v1/users', UsersController);
    this.app.use('/api/v1/trips', TripsControllers);
  }
  
}
