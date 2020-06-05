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

// Delete a User with Id
user.delete("/:id", verifyToken, controller.remove);

export default user;
