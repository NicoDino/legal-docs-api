import { Router } from 'express';
import { Request, Response } from 'express';
import Borrador from '../borradores/borrador.model';
import Controller from '../borradores/borrador.controller';
import { getPaymentStatus } from './mercadopago.helper';

const pasarela: Router = Router();
const borradorController = new Controller();

pasarela.post('/webhook/:idCopia', async (req: Request, res: Response) => {
  if (req.body.data && req.body.data.id) {
    const borrador = await Borrador.findById(req.params.idCopia);
    const idPago = req.body.data.id;
    const statusPago = await getPaymentStatus(idPago);
    console.log('PAYMENT STATUS', statusPago);
    borrador.pago = statusPago;
    if (statusPago == 'approved') {
      /**El primer post que hace MP al webhook con el numero de orden 'merchant_order' */
      borradorController.crearCopia(borrador._id);
    }
    await borrador.save();
  }
  return res.sendStatus(200);
});
export default pasarela;
