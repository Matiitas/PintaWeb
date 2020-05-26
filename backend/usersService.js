let rooms = new Map();

const addUser = (roomId, username) => {
  if (rooms.has(roomId)) {
    users = rooms.get(roomId);
    users.push({ username: username, points: 0 });
    rooms = rooms.set(roomId, users);
  } else {
    rooms = rooms.set(roomId, [{ username: username, points: 0 }]);
  }
};

const findUsers = (roomId) => {
  return rooms.get(roomId);
};

module.exports = { addUser, findUsers };
