import { io } from "socket.io-client";

export function createSocket() {
  const socket = io("http://localhost:3333");
  return socket;
}