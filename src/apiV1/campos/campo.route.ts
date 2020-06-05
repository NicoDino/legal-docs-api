import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './campo.controller';

const campo: Router = Router();
const controller = new Controller();

// Retrieve all campos
campo.get('/',verifyToken, controller.findAll);

// Retrieve a specific campo
campo.get('/:id', verifyToken,controller.findOne);

// Create a campo
campo.post('/', verifyToken, controller.create);

// Update a campo with Id
campo.put('/:id', verifyToken, controller.update);

// Delete a campo with Id
campo.delete('/:id', verifyToken, controller.remove);

export default campo;
