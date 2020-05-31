import { User } from "./User";

export interface Room {
    _id: string;
    uuid: string;
    name: string;
    users: User[];
}