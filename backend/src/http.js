import express from 'express';
import { createServer } from 'http';
import {routes} from './routes';
import cors from "cors";
import { Server } from 'socket.io';
import { MongoDB } from './database';
import dotenv from 'dotenv';

dotenv.config();

MongoDB();
const app = express();
app.use(cors());
const http = createServer(app);

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

export {http, app, io};