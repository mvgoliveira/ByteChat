import {Router} from "express";
import { UsersController } from "./controllers/UsersController";
import { SessionController } from "./controllers/SessionController";

const usersController = new UsersController();
const sessionController = new SessionController();

const routes = Router();

// Users
routes.post('/users', usersController.create);

// Session
routes.post('/login', sessionController.create);

export { routes };