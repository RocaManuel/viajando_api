export interface UserInterface {
    country?: string;
    created_at?: Date;
    email?: string;
    is_driver?: boolean;
    is_email_verified?: boolean;
    is_user_verified?: boolean;
    last_seen_at?: Date;
    lastname?: string;
    location?: string;
    name?: string;
    password?: string;
    profile_picture?: string
    rate?: number;
    tel?: string;
    second_step_auth?: boolean;
}

export interface Params {
  [x: string]: any
}