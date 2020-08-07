import { Router, Response } from 'express';
import bodyParser from 'body-parser';
import { GeneralHelper } from '../helper/general.helper';
import {Trips, Status} from '../entity/Trisps'
import { TripsSerivce } from '../services/Trips.service';
import { CarsSerivce } from '../services/cars.service';

class TripsController {
    constructor() {
        this.router = Router();
        this.init();
    }
    private generalHelper = new GeneralHelper();
    private tripsService = new TripsSerivce();
    // private carsService = new CarsSerivce();
    private jsonParser = bodyParser.json();
    public router: Router;
    private init(){
        this.router.post('/', this.jsonParser, (req: any, res: Response) => this.createTrip(req, res));
    }
    private async createTrip(req: any, res: Response){
        try{
            // const params = req.body;
            // const requiredParams = ['driver_id', 'car_id', 'passenger_ammount', 'from', 'to',
            //                         'city_name', 'price', 'start_on', 'end_on', 'is_periodic',
            //                         'max_rad_km', 'status'];
            // if(!this.generalHelper.validateRequiredParams(req.query, requiredParams)) return res.status(400).json({ error: 'missing params' });
                
            // console.log(params);
            // const response = this.tripsService.postTrips();
            // const a = this.carsService.createCar();
            const response = await this.tripsService.getTrip();
            res.status(200).json({ succes: true, response });
        }
        catch(e){};
    }
}
 const tripsController = new TripsController();
 export default tripsController.router;