import mercadopago = require('mercadopago');
import * as config from '../../../config.private';
import Documento from '../documentos/documento.model';

export async function sendLink(borrador, req, res) {
  try {
    // Agrega credenciales
    mercadopago.configure({
      access_token: config.MP_ACCESS_TOKEN,
      // TODO comentar modo sandbox en prod
      sandbox: true,
    });
    /**Obtenemos el documento asociado */
    const documento = await Documento.findById(borrador.documento);
    /** Preferencias para el link de checkout de mercadopago */
    let preference = {
      items: [
        {
          title: documento.nombre,
          unit_price: documento.precio,
          quantity: 1,
        },
      ],
      notification_url: `http://159.89.85.19:3000/v1/mercadopago/webhook/${borrador._id}`,
      /** Modificar con links reales de la aplicacion */
      // back_urls: {
      //   success: 'localhost:4200/fin-operacion/exito',
      //   failure: 'localhost:4200/fin-operacion/error'
      // },
      // auto_return: 'approved',
    };
    const response = await mercadopago.preferences.create(preference);
    res.json(response.body.init_point);
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
      data: null,
    });
  }
}

export async function getPaymentStatus(paymentId) {
  mercadopago.configure({
    access_token: config.MP_ACCESS_TOKEN,
    // TODO comentar modo sandbox en prod
    sandbox: true,
  });
  const pago = await mercadopago.payment.get(paymentId);
  return pago.body.status;
}
