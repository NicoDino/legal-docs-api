import mercadopago = require('mercadopago');
import Documento from '../documentos/documento.model';
import { MP_ACCESS_TOKEN, API_URL, APP_URL } from '../../config.private';

export async function sendLink(borrador, req, res) {
  try {
    // Agrega credenciales
    mercadopago.configure({
      access_token: MP_ACCESS_TOKEN,
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
      notification_url: `${API_URL}/v1/mercadopago/webhook/${borrador._id}`,
      back_urls: {
        success: `${APP_URL}/fin-operacion/exito`,
        failure: `${APP_URL}/fin-operacion/error`,
      },
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
    access_token: MP_ACCESS_TOKEN,
    // TODO comentar modo sandbox en prod
    sandbox: true,
  });
  const pago = await mercadopago.payment.get(paymentId);
  return pago.body.status;
}
