import SocketIOClient from "socket.io-client";

class SocketService {
  socket = SocketIOClient("http://localhost:5000");

  constructor() {}

  emit(event, data, callback) {
    this.socket.emit(event, data, callback);
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }
}

export default new SocketService();
