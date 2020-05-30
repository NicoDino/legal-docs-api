import { Router } from 'express';
import auth from './auth/auth.route';
import users from './users/user.route';
import categorias from './categorias/categoria.route';
import faqs from './preguntas-frecuentes/faq.route';
import documentos from './documentos/documento.route';
import campos from './campos/campo.route';
import borradores from './borradores/borrador.route';

const router: Router = Router();

router.use('/', auth);
router.use('/users', users);
router.use('/categorias', categorias);
router.use('/faqs', faqs);
router.use('/documentos', documentos);
router.use('/campos', campos);
router.use('/borradores', borradores);


export default router;
