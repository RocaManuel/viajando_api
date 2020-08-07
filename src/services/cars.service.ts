import { getConnection } from "typeorm";
import { Cars } from "../../src/entity/Car";
import telkit from 'terminal-kit';

export class CarsSerivce {
    public async getCar() {
      return await getConnection().manager.getRepository(Cars)
        .findOne({
            where: { id: 1 }
        });
    }

    public async createCar() {
        const car = new Cars();
        car.driver_id = 5;
        car.car_size = 4;
        car.car_model = 'Alpha Romeo'
        car.car_age = 5;
        return await getConnection().manager.save(car)
    }
}