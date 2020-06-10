import { Router } from "express";
import verifyToken from "../../helpers/verifyToken";
import Controller from "./user.controller";

const user: Router = Router();
const controller = new Controller();

// Retrieve all Users
user.get("/", verifyToken, controller.findAll);

// Retrieve a Specific User
user.get("/:id", verifyToken, controller.findOne);

// Update a User with Id
user.put("/:id", verifyToken, controller.update);

user.post("/:id/change_password", verifyToken, controller.changePass);

// Delete a User with Id
user.delete("/:id", verifyToken, controller.remove);

/* Rutas publicas ---> obtener token & reestablecer pass utilizando token */

user.post("/request_token", controller.getToken);

user.post("/password_reset", controller.resetPass);

export default user;
