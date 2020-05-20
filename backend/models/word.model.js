const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  word: {
    //word es un campo
    type: String,
    required: true,
    unique: true,
    trim: true, //corta espacios en blanco
    lowercase: true, //pone en lowercase
    minlength: 3, //minimo 3 char long
  },
});

const Word = mongoose.model("Word", wordSchema); // Word, el nombre de la tabla
module.exports = Word; // se exporta aca
