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

const {
  addUser,
  findUsers,
  addRoomName,
  findRoomName,
} = require("./usersService");

//para guardar los usuarios con sus respectivas salas
//{ roomId: [username: string, points: int]  }
//const rooms = new Map();

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

    addUser(socket.id, roomId.toString(), data.username);
    addRoomName(roomId.toString(), data.room);
    console.log(
      `User ${data.username} created room ${data.room} with uuid ${roomId}`
    );
    response({ roomId: roomId });
  });

  socket.on("join-room", (data, response) => {
    socket.join(data.roomId);
    socket.roomId = data.roomId;
    console.log(
      "El usuario:",
      socket.username,
      "se unio a la room:",
      data.roomId
    );
    usersInRoom = findUsers(data.roomId.toString());
    roomName = findRoomName(data.roomId.toString());
    response({
      owner: socket.owner,
      players: usersInRoom,
      username: socket.username,
      roomName: roomName,
      userId: socket.id,
    });
  });

  socket.on("set-username", (data, response) => {
    socket.username = data.username;
    addUser(socket.id, socket.roomId.toString(), data.username);
    console.log("Usuarios activos:", findUsers(socket.roomId.toString()));
    io.in(socket.roomId).emit("user-joins", {
      username: socket.username,
      userId: socket.id,
    });
  });

  socket.on("send-message", (data, response) => {
    socket.broadcast.to(socket.roomId).emit("new-message", {
      username: socket.username,
      message: data,
    });
  });

  //manejo del canvas

  socket.on("drawing", (data, response) => {
    socket.broadcast.to(socket.roomId).emit("new-drawing", {
      x: data.x,
      y: data.y,
      xx: data.xx,
      yy: data.yy,
    });
  });

  socket.on("clear-canvas", (data, response) => {
    io.in(socket.roomId).emit("clear");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//start del server, en su puerto
server.listen(port, () => {
  console.log("Server is running on port: ", port);
});
