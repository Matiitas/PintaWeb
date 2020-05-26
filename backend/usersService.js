const rooms = new Map();

const addUser = (roomId, username) => {
  rooms.set(roomId, [{ username: username, points: 0 }]);
};

const findUsers = (roomId) => {
  return rooms.get(roomId);
};

module.exports = { addUser, findUsers };
