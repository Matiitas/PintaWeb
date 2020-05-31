class UserService {
  isRegistered = false;
  user = null;

  getIsRegistered() {
    return this.isRegistered;
  }

  setIsRegistered(isRegistered) {
    this.isRegistered = isRegistered;
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
export default new UserService();
