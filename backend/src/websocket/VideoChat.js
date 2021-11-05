import {io} from '../http';

io.on("connection", (socket) => {
  socket.emit("start-chat", socket.id);

  socket.on("join-room", ({ peerId, roomId, username }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", {peerId, name: username, socketID: socket.id});
  });
});