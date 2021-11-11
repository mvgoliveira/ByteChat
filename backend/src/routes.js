import {Router} from "express";
import { UsersController } from "./controllers/UsersController";

const usersController = new UsersController();

const routes = Router();

routes.post('/users', usersController.create);

export { routes };