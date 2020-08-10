import { getConnection } from "typeorm";
import { Cars } from "../../src/entity/Car";
import telkit from 'terminal-kit';

export class CarsSerivce {

    public async getCar(params: any) {
      return await getConnection().manager.getRepository(Cars).findOne(params)
    }

    public async createCar(car: Cars) {
        return await getConnection().manager.save(car)
    }

    public async getUserCars(params: any) {
        return await getConnection().manager.getRepository(Cars).find(params)
    }

}
