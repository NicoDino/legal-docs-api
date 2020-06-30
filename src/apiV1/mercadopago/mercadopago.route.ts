import { Router } from 'express';
import { Request, Response } from 'express';
import Borrador from '../borradores/borrador.model';
import Controller from '../borradores/borrador.controller';
import { getPaymentStatus } from './mercadopago.helper';

const pasarela: Router = Router();
const borradorController = new Controller();

pasarela.post('/webhook/:idCopia', async (req: Request, res: Response) => {
  if (req.body.data && req.body.data.id) {
    console.log(1);
    const idPago = req.body.data.id;
    const statusPago = await getPaymentStatus(idPago);
    if (statusPago === 'approved') {
      console.log(2);
      const borrador = await Borrador.findById(req.params.idCopia);
      borrador.pago = 'pagado';
      borrador.idPagoMP = idPago;
      /**El primer post que hace MP al webhook con el numero de orden 'merchant_order' */

      console.log(3);
      await borrador.save();
      borradorController.crearCopia(borrador._id);
    }
  }
  return res.sendStatus(200);
});
export default pasarela;
