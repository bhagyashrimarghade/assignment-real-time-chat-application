const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const path = require("path");
const socketio = require("socket.io");
const PORT = 3000;

const io = socketio(server);

const {
  newUser,
  getIndividualRoomUsers,
  formatMessage,
  getActiveUser,
  exitRoom,
} = require("./helpers/helpers");

app.use(express.static(path.join(__dirname, "public")));

/**make a connection with the user from server side */
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, chatroom }) => {
    const user = newUser(socket.id, username, chatroom);
    socket.join(user.chatroom);

    /**emit message from server to user */
    socket.emit(
      "message",
      formatMessage("Chat App", "Message are limited to this room.")
    );

    /**sends data to all connected sockets except the one that originally emitted the event */
    socket.broadcast
      .to(user.chatroom)
      .emit(
        "message",
        formatMessage("Chat App", `${user.username} has joined the room`)
      );

    /**sends data to all connected sockets, including the one that originally emitted the event */
    io.to(user.chatroom).emit("roomUsers", {
      room: user.chatroom,
      users: getIndividualRoomUsers(user.chatroom),
    });

    /**listen for message from user */
    socket.on("chatMessages", (msg) => {
      const user = getActiveUser(socket.id);
      io.to(user.chatroom).emit("message", formatMessage(user.username, msg));
    });

    /**disconnect the socket */
    socket.on("disconnect", () => {
      const user = exitRoom(socket.id);
      if (user.room) {
        io.to(user.chatroom).emit("roomUsers", {
          room: user.chatroom,
          users: getIndividualRoomUsers(user.chatroom),
        });
        io.to(user.room).emit(
          "message",
          formatMessage("Chat App", `${user.username} has left the room`)
        );
      }
    });
  });
});

server.listen(PORT, () => {
  console.log("server is running...");
});
