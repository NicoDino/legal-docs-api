import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './faq.controller';

const faq: Router = Router();
const controller = new Controller();

// Retrieve all faqs
faq.get('/', verifyToken, controller.findAll);

// Get public faqs
faq.get('/public', controller.findAllPublic);

// Retrieve a specific faq
faq.get('/:id', verifyToken, controller.findOne);

// Create a faq
faq.post('/', verifyToken, controller.create);

// Update a faq with Id
faq.put('/:id', verifyToken, controller.update);

// Delete a faq with Id
faq.delete('/:id', verifyToken, controller.remove);

export default faq;
