const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  owner: {
    type: Boolean,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  //id de la sesion del socket
  token: {
    type: String,
    required: true,
  },
});
module.exports = UserSchema;
