import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './borrador.controller';

const borrador: Router = Router();
const controller = new Controller();

// Retrieve all borradors
borrador.get('/', controller.findAll);

// Retrieve a specific borrador
borrador.get('/:id', controller.findOne);

// Create a borrador
borrador.post('/', controller.create);

// Update a borrador with Id
borrador.put('/:id', verifyToken, controller.update);

// Delete a borrador with Id
borrador.delete('/:id', verifyToken, controller.remove);

export default borrador;

