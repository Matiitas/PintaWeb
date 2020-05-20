const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      //username es un campo
      type: String,
      required: true,
      unique: true,
      trim: true, //corta espacios en blanco
      minlength: 4, //minimo 3 char long
    },
  },
  {
    points: {
      //puntos que tendrá, default 0
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    rol: {
      type: String,
      required: true,
      default: "jugador",
    },
  }
);

const User = mongoose.model("User", userSchema); // User, el nombre de la tabla
module.exports = User; // se exporta aca
