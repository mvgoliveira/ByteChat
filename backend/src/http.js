import express from 'express';
import { createServer } from 'http';
import { ExpressPeerServer } from "peer";
import {routes} from './routes';
import cors from "cors";
import { Server } from 'socket.io';
// import { MongoDB } from './database';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB();
const app = express();
app.use(cors());
const http = createServer(app);
const peer = ExpressPeerServer(http);

const io = new Server(http, {
  cors: {
    origin: '*'
  }
})

io.on("connection", (socket) => {
  console.log("Connected at ", socket.id);
});

app.use(express.json());
app.use(routes);
app.use('/peerjs', peer);

export {http, app, io};