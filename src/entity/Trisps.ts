import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, EntityOptions, JoinColumn, ManyToMany} from "typeorm";
import { User } from "./User";
import { Cars } from "./Car";



const config: EntityOptions = {
    name: 'trips',
    synchronize: false
}

export enum Status{
 ACTIVE = "ACTIVE",
 COMPLETED = "COMPLETED",
 DELETED = "DELETED"     
}

@Entity(config) 
export class Trips {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    driver_id: number;

    @Column()
    car_id: number;

    @Column()
    passenger_amount: number;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    city_name: string;

    @Column()
    price: number;

    @Column()
    start_on: Date;

    @Column()
    end_on: Date;

    @Column()
    is_periodic: boolean;

    @Column()
    periodic_days: number;

    @Column()
    max_radio_killometers: number;

    @Column()
    status: Status; 

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "driver_id", referencedColumnName: "id"})
    user: User;
    
    @ManyToMany(type => Cars, car => car.id)
    @JoinColumn({ name: "car_id", referencedColumnName: "id"})
    car: Cars;
    
    
}
