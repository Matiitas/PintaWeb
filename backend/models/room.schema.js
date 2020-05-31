const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./user.schema");

const RoomSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  users: [UserSchema],
});

module.exports = RoomSchema;
