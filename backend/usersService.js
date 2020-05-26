let rooms = new Map();
let roomsName = new Map();

const addUser = (socketId, roomId, username) => {
  if (rooms.has(roomId)) {
    users = rooms.get(roomId);
    users.push({ key: socketId, username: username, points: 0 });
    rooms = rooms.set(roomId, users);
  } else {
    rooms = rooms.set(roomId, [
      { key: socketId, username: username, points: 0 },
    ]);
  }
};

const findUsers = (roomId) => {
  return rooms.get(roomId);
};

const addRoomName = (roomId, name) => {
  roomsName = roomsName.set(roomId, name);
};

const findRoomName = (roomId) => {
  return roomsName.get(roomId);
};

module.exports = { addUser, findUsers, addRoomName, findRoomName };
