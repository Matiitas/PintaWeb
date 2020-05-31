import SocketService from "./SocketService";
import UserService from "./UserService";
import { Room } from "../models/Room";
import { User } from "../models/User";
import { RoomUserWrapper } from "../models/RoomUserWrapper";

class RoomService {
  room: null | Room = null;

  addPlayer(user: User) {
    if (this.room) {
      const users = [...this.room.users];
      users.push(user);
      this.room.users = users;
    };
  }

  createRoom(data: { player: string, sala: string }, callback: (response: RoomUserWrapper) => void) {
    SocketService.emit(
      "create-room",
      { username: data.player, room: data.sala },
      (response: RoomUserWrapper) => {
        UserService.setIsRegistered(true);
        UserService.setUser(response.user);
        this.room = response.room;
        callback(response);
      }
    );
  }

  joinRoom(data: { roomId: string, name: string }, callback: (response: RoomUserWrapper) => void) {
    SocketService.emit(
      "join-room",
      { roomId: data.roomId, username: data.name },
      (response: RoomUserWrapper) => {
        UserService.setUser(response.user);
        this.room = response.room;
        callback(response);
      }
    );
  }

  getRoom() {
    return this.room;
  }
}
export default new RoomService();
