import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './documento.controller';

const documento: Router = Router();
const controller = new Controller();

// Retrieve all documentos
documento.get('/', controller.findAll);

// Retrieve a specific documento
documento.get('/:id', controller.findOne);

// Create a documento
documento.post('/', verifyToken, controller.create);

// Update a documento with Id
documento.put('/:id', verifyToken, controller.update);

// Delete a documento with Id
documento.delete('/:id', verifyToken, controller.remove);

export default documento;
