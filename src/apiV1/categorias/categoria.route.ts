import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './categoria.controller';

const categoria: Router = Router();
const controller = new Controller();

// Retrieve all categorias
categoria.get('/', controller.findAll);

// Retrieve a specific categoria
categoria.get('/:id', controller.findOne);

// Create a categoria
categoria.post('/', verifyToken, controller.create);

// Update a categoria with Id
categoria.put('/:id', verifyToken, controller.update);

// Delete a categoria with Id
categoria.delete('/:id', verifyToken, controller.remove);

export default categoria;
