import { User } from "../models/User";

class UserService {
  isRegistered = false;
  user: User | null = null;

  getIsRegistered() {
    return this.isRegistered;
  }

  setIsRegistered(isRegistered: boolean) {
    this.isRegistered = isRegistered;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
export default new UserService();
