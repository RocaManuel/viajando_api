import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, EntityOptions, JoinColumn} from "typeorm";
import { User } from "../entity/User";

const config: EntityOptions = {
    name: 'cars',
    synchronize: false
}

@Entity(config) 
export class Cars {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    driver_id : number;

    @Column()
    car_model : string;

    @Column()
    car_age : number;
    
    @Column()
    car_size : number;

    @Column()
    car_list_id : number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: "driver_id", referencedColumnName: "id"})
    user: User;
}