import { Router } from "express";
import verifyToken from "../../helpers/verifyToken";
import {
  findAll,
  findOne,
  create,
  update,
  remove,
} from "./documento.controller";

const documento: Router = Router();

// todos los documentos
documento.get("/", verifyToken, findAll);

// documento by id
documento.get("/:id", verifyToken, findOne);

// crear nuevo documento
documento.post("/", verifyToken, create);

// actualizar documento existente
documento.put("/:id", verifyToken, update);

// borrar documento
documento.delete("/:id", verifyToken, remove);

export default documento;
