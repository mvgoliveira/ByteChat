import {io} from '../http';

io.on("connection", (socket) => {
  socket.emit("hello world", socket.id);
})