const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //nos ayuda a conectarnos con la base de datos

require("dotenv").config(); //configura para que tengamos
//variables de ambito y dotenv file

const app = express(); // es como crear el express server y en que puerto estara
const port = process.env.PORT || 5000;

app.use(cors()); //midleware
app.use(express.json()); //nos permite parsear json, el servidor va a enviar y recibir json

const uri = process.env.ATLAS_URI; //es la uri de la base de datos
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const wordsRouter = require("./routes/words");

app.use("/words", wordsRouter); //cada vez que van a la direccion root de nuesta app
// y le ponen /words, va a cargar todo lo que hay en
//wordsRouter
app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
//start el server, en su puerto
