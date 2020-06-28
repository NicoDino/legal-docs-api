import mercadopago = require('mercadopago');

export default class MercadopagoController {
  // Agrega credenciales
  getLink = (req, res) => {
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
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // Este valor reemplazará el string "$$init_point$$" en tu HTML
        //   global.init_point = response.body.init_point;
        res.json(response.body.init_point);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
