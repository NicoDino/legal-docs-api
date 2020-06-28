import { Router } from 'express';
import mercadopago = require('mercadopago');

const pasarela: Router = Router();

pasarela.post('/', (req, res) => {
  // Agrega credenciales
  mercadopago.configure({
    access_token: 'TEST-6903989763585190-062703-e9fda5142fb2818a6c00ffac3db57dcc-115523827',
    sandbox: true,
  });

  // Crea un objeto de preferencia
  let preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      },
    ],
    notification_url: 'http://159.89.85.19:3000/v1/mercadopago/webhook',
    // back_urls: {
    //   success: 'localhost:4200/',
    //   failure: 'http://www.tu-sitio/failure',
    //   pending: 'http://www.tu-sitio/pending',
    // },
    // auto_return: 'approved',
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // Este valor reemplazará el string "$$init_point$$" en tu HTML
      //   global.init_point = response.body.init_point;
      console.log('LINK DE PAGO..', response.body);
      res.json(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

pasarela.post('/webhook', (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('WEBHOOK RESPONSE...', body);
      res.end('ok');
    });
  }
  return res.status(200);
});
export default pasarela;
