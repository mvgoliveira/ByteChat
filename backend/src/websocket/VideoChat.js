import {io} from '../http';

io.on("connection", (socket) => {
  socket.emit("start-chat", socket.id);

  socket.on("join-room", ({ peerId, roomCode, username }) => {
    socket.join(roomCode);
    socket.to(roomCode).emit("user-connected", {peerId, name: username, socketID: socket.id});
  });

  socket.on("disconnect", () => {
    io.emit("find-room-by-socketID", socket.id);
  });

  socket.on("disconnect-user", ({socketId, roomCode}) => {    
    io.to(roomCode).emit("user-disconnected", socketId);
  });

  socket.on("toggle-audio", ({roomCode, isAudioOpen}) => {
    socket.to(roomCode).emit("toggle-user-audio", {socketId: socket.id, isAudioOpen});
  });

  socket.on("verify-is-muted", (socketId) => {
    io.to(socketId).emit("verify-is-muted", socket.id);
  });

  socket.on("is-muted", ({isMuted, socketId, peerSocketId}) => {
    io.to(socketId).emit("is-muted", {isMuted, peerSocketId})
  });
});