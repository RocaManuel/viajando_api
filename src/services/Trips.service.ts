import { getConnection } from "typeorm";
import { Trips, Status } from "../entity/Trisps";
import telkit from 'terminal-kit';

export class TripsSerivce {

  public async getTrip() {
    return await getConnection().manager.getRepository(Trips)
      .findOne({
          relations: ['user'] ,
          where: { id: 7 }
      });
  }

    public async postTrips() {
      try {
        const trip = new Trips();
        trip.driver_id = 7;
        trip.car_id = 1;
        trip.passenger_amount = 1;
        trip.from = "cordoba";
        trip.to = "jesus maria";
        trip.city_name = "cordoba";
        trip.price = 1;
        trip.start_on = new Date();
        trip.end_on = new Date();
        trip.is_periodic= false;
        trip.periodic_days = 0;
        trip.max_radio_killometers = 1;
        trip.status = Status.ACTIVE
        return await getConnection().manager.save(trip);
      } catch(e) {
        telkit.terminal(e);
        return e;
      }
    }
  
  }

