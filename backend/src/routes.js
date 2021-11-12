import {Router} from "express";
import { UsersController } from "./controllers/UsersController";
import { SessionController } from "./controllers/SessionController";
import { RoomController } from "./controllers/RoomController";

const usersController = new UsersController();
const sessionController = new SessionController();
const roomController = new RoomController();

const routes = Router();

//room
routes.post('/room', roomController.create);
routes.get('/rooms/:roomCode', roomController.findOne);
routes.put('/room/:roomCode', roomController.update);
routes.delete('/room/:roomCode', roomController.delete);

// Users
routes.post('/users', usersController.create);

// Session
routes.post('/login', sessionController.create);

export { routes };