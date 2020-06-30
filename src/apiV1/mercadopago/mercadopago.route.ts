import { Router } from 'express';
import { Request, Response } from 'express';
import Borrador from '../borradores/borrador.model';
import Controller from '../borradores/borrador.controller';

const pasarela: Router = Router();
const borradorController = new Controller();

pasarela.post('/webhook/:idCopia', async (req: Request, res: Response) => {
  res.sendStatus(200);
  const borrador = await Borrador.findById(req.params.idCopia);
  borrador.pago = 'pagado';
  borrador.idPagoMP = req.body.data.id;
  await borrador.save();
  borradorController.crearCopia(borrador._id);
  return;
});
export default pasarela;
