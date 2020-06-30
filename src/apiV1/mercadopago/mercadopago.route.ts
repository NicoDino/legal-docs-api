import { Router } from 'express';
import { Request, Response } from 'express';
import Borrador from '../borradores/borrador.model';
import Controller from '../borradores/borrador.controller';
import { getPaymentStatus } from './mercadopago.helper';

const pasarela: Router = Router();
const borradorController = new Controller();

pasarela.post('/webhook/:idCopia', async (req: Request, res: Response) => {
  if (req.body.data && req.body.data.id) {
    const pago = await getPaymentStatus(req.body.data.id);

    const borrador = await Borrador.findById(req.params.idCopia);
    borrador.pago = 'pagado';
    borrador.idPagoMP = req.body.data.id;
    /**El primer post que hace MP al webhook con el numero de orden 'merchant_order' */

    await borrador.save();
    borradorController.crearCopia(borrador._id);
  }
  return res.sendStatus(200);
});
export default pasarela;
