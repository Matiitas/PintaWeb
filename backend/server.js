/** Imports */
//uuid generator
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
//nos ayuda a conectarnos con la base de datos
const mongoose = require("mongoose");
const wordsRouter = require("./routes/words");

/** Env configuration */
//configura para que tengamos variables de ambito y dotenv file
require("dotenv").config();

/** Code */
const port = process.env.PORT || 5000;
// es como crear el express server y en que puerto estara
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//midleware
app.use(cors());
//nos permite parsear json, el servidor va a enviar y recibir json
app.use(express.json());
/*
  Cada vez que van a la direccion root de nuesta app y le ponen /words, 
  va a cargar todo lo que hay en wordsRouter
*/
app.use("/words", wordsRouter);

/** DB configuration */
//es la uri de la base de datos
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

/** Socket configurations */
io.on("connection", (socket) => {
  console.log("New user connected!", socket.id);

  socket.on("create-room", (data, response) => {
    const roomId = uuidv4();

    socket.username = data.username;
    socket.owner = true;
    socket.roomId = data.roomId;
    //Muy probablemente necesitemos persistir info de la sala, como el nombre (por ahora lo guardamos en la sesion)
    socket.to(roomId).name = data.room;

    console.log(
      `User ${data.username} created room ${data.room} with uuid ${roomId}`
    );

    response({ roomId: roomId });
  });

  socket.on("join-room", (data, response) => {
    socket.join(data.roomId);

    console.log(
      "El usuario:",
      socket.username,
      "quiere unirse a la room:",
      data.roomId
    );

    response({
      room: socket.to(data.roomId).name,
      owner: socket.owner,
      username: socket.username,
    });
  });

  socket.on("addUsername", (data) => {
    socket.username = data.name;
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//start del server, en su puerto
server.listen(port, () => {
  console.log("Server is running on port: ", port);
});
