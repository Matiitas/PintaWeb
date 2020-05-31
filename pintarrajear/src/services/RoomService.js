import SocketService from "./SocketService";
import UserService from "./UserService";

class RoomService {
  room = null;

  addPlayer(user) {
    this.room.users = [...this.room.users].push(user);
  }

  createRoom(data, callback) {
    SocketService.emit(
      "create-room",
      { username: data.player, room: data.sala },
      (response) => {
        UserService.setIsRegistered(true);
        UserService.setUser(response.user);
        this.room = response.room;
        callback(response);
      }
    );
  }

  joinRoom(data, callback) {
    SocketService.emit(
      "join-room",
      { roomId: data.roomId, username: data.name },
      (response) => {
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
