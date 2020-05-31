import SocketIOClient from "socket.io-client";

//TODO: Use generics
class SocketService {
  socket = SocketIOClient("http://localhost:5000");

  constructor() { }

  emit(event: string, data: any, callback: (response: any) => void) {
    this.socket.emit(event, data, callback);
  }

  on(event: string, callback: (response: any) => void) {
    this.socket.on(event, callback);
  }
}

export default new SocketService();
