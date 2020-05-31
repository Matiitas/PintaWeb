const UserSchema = require("./user.schema");
const RoomSchema = require("./room.schema");

const mongoose = require("mongoose");

const Models = {
  User: mongoose.model("User", UserSchema),
  Room: mongoose.model("Room", RoomSchema),
};

module.exports = Models;
