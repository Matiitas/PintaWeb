import { User } from "./User";
import { Room } from "./Room";

export interface RoomUserWrapper {
    user: User;
    room: Room;
}