import { UserInterface, Params } from "../../src/interfaces/User.interface";
import moment from 'moment';
import { Cars } from "../entity/Car";
import { User } from "../entity/User";
import { Trips, Status as TripStatus } from "../entity/Trips";
import { Between } from "typeorm";
import { GeolocationHelper } from "./geolocation.helper";

export class ORMHelper {

  private geolocationHelper = new GeolocationHelper();

  public formatParamsForWhere(params: any) {
    const response = { where: {} };
    // tslint:disable-next-line: forin
    for (const param in params) {
      response.where = { ...response.where, [param]: params[param] }
    }
    return response;
  }

  private getUserWithEntity(params: Params) {
    const user: any = new User();
    // tslint:disable-next-line: forin
    for (const param in params) {
      user[param] = params[param];
    }
    return user;
  }

  public getCarBasic(params: any) {
    return this.getCarWithEntity(params);
  }

  private getCarWithEntity(params: any) {
    const cars: any = new Cars();
    // tslint:disable-next-line: forin
    for (const param in params) {
      cars[param] = params[param];
    }
    return cars;
  }

  public getUserBasics(params: Params) {
    const user = {
      created_at: new Date(),
      is_driver: false,
      is_email_verified: false,
      is_user_verified: false,
      last_seen_at: new Date(),
      profile_picture: '',
      second_step_auth: false
    }
    return this.getUserWithEntity({ ...user, ...params });
  }

  private getTripWithEntity(params: any) {
    const trip: any = new Trips();
    // tslint:disable-next-line: forin
    for (const param in params) {
      trip[param] = params[param];
    }
    return trip;
  }

  public createTrip(params: any) {
    const trip = {
      ...params,
      start_on: moment(new Date(params.start_on)).format(),
      end_on: moment(new Date(params.end_on)).format(),
      status: 'ACTIVE'
    }
    return this.getTripWithEntity(trip);
  }

  public async searchTripParams(params: any) {
    const fromLat = Number(params.from_lat);
    const fromLng = Number(params.from_lng);
    const range = Number(params.range);
    const toLat = Number(params.to_lat);
    const toLng = Number(params.to_lng);
    const geoFrom = await this.geolocationHelper.getBoundLocation(fromLat, fromLng, range);
    const geoTo = await this.geolocationHelper.getBoundLocation(toLat, toLng, range);
    const start_on = new Date(params.start_on);
    const end_on = new Date(params.end_on);
    const trip = {
      where: {
        from_lat: Between(geoFrom.minLat, geoFrom.maxLat),
        from_lng: Between(geoFrom.minLng, geoFrom.maxLng),
        to_lat: Between(geoTo.minLat, geoTo.maxLat),
        to_lng: Between(geoTo.minLng, geoTo.maxLng),
        start_on,
        end_on,
        status: TripStatus.ACTIVE
      }
    }
    return trip;
  }

}