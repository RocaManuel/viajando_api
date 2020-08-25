import { Router, Response } from 'express';
import bodyParser from 'body-parser';
import { TripsSerivce } from '../services/Trips.service';
import { Auth } from '../guardians/auth';
import { ParamsHelper } from '../helper/params.helper';
import { ORMHelper } from '../helper/orm.helper';

class TripsController {

    public router: Router;

    private auth = new Auth();
    private jsonParser = bodyParser.json();

    private tripsService = new TripsSerivce();

    private paramsHelper = new ParamsHelper();
    private ormHelper = new ORMHelper();

    private init() {
        this.router.get('/', this.jsonParser, this.auth.authenticateToken, this.paramsHelper.validateParams, (req: any, res: Response) => this.getTripById(req, res));
        this.router.post('/', this.jsonParser, this.auth.authenticateToken, this.paramsHelper.validateParams, (req: any, res: Response) => this.createTrip(req, res));
        this.router.get('/search_trip', this.jsonParser, this.auth.authenticateToken, this.paramsHelper.validateParams, (req: any, res: Response) => this.searchTrip(req, res));
    }

    private async getTripById(req: any, res: Response) {
        try {
            const params = this.ormHelper.formatParamsForWhere(req.query);
            const response = await this.tripsService.getTrip(params);
            return res.status(200).json({ response });
        } catch (e) {
            return res.status(400).json({ error: e });
        }
    }

    private async createTrip(req: any, res: Response) {
        try {
            const params = req.body;
            const trip = this.ormHelper.createTrip(params);
            const response = this.tripsService.createTrip(trip);
            return res.status(200).json({ succes: true });
        }
        catch (e) {
            return res.status(400).json({ error: e });
        };
    }

    private async searchTrip(req: any, res: Response) {
        try {
            console.log(req.query);
            const params = await this.ormHelper.searchTripParams(req.query);
            const trips = await this.tripsService.getTripsByLatitude(params);
            return res.json({ trips });
        } catch (e) {
            return res.json({ error: e });
        }
    }

    constructor() {
        this.router = Router();
        this.init();
    }
}
const tripsController = new TripsController();
export default tripsController.router;