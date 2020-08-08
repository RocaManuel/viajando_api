import { Entity, PrimaryGeneratedColumn, Column, EntityOptions, OneToMany } from "typeorm";
import { Trips } from "./Trips";

const config: EntityOptions = {
    name: 'users',
    synchronize: false
}

@Entity(config)
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country: string;

    @Column()
    created_at: Date;

    @Column()
    email: string;

    @Column()
    is_driver: boolean;

    @Column()
    is_email_verified: boolean;

    @Column()
    is_user_verified: boolean;

    @Column()
    last_seen_at: Date;

    @Column()
    lastname: string;

    @Column()
    location: string;

    @Column()
    name: string;

    @Column({ select: false })
    password: string;

    @Column()
    profile_picture: string

    @Column()
    rate: number;

    @Column()
    tel: string;

    @Column()
    second_step_auth: boolean;

    @OneToMany(type => Trips, trip => trip.driver_id)
    trips: Trips[];

}
