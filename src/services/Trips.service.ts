import { getConnection, MoreThan, Not, Between } from "typeorm";
import { Trips, Status } from "../entity/Trips";
import telkit from 'terminal-kit';

export class TripsSerivce {

  public async getTrip(params: any) {
    return await getConnection().manager.getRepository(Trips)
      .findOne({
        relations: ['user'],
        ...params
      });
  }

  public async createTrip(trip: any) {
    try {
      return await getConnection().manager.save(trip);
    } catch (e) {
      telkit.terminal(e);
      return e;
    }
  }

  public async getTripsByLatitude(params: any) {
    try {
      return await getConnection().manager.getRepository(Trips).find({ ...params })
    } catch (e) {
      telkit.terminal(e);
      return e;
    }
  }

}

