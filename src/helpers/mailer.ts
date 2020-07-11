import config from '../config/config';
const nodemailer = require('nodemailer');

export async function sendToken(usuario, newToken) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.EMAIL, // generated ethereal user
      pass: config.MAIL_PASS, // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `Legal Aid - <${config.EMAIL}>`, // sender address
    to: usuario.email, // list of receivers
    subject: 'Código solicitado', // Subject line
    html: `<p><b>Utilice el siguiente código para reestablecer sus credenciales</b></p>
             <p> <b> ${newToken}</b></p> <br>
             <b>Gracias por utilizar nuestro servicio.</b>
              `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export async function sendBorrador(emailCliente, borrador, borradorDocx, nombreDocumento) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.EMAIL, // generated ethereal user
      pass: config.MAIL_PASS, // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `Legal Aid - <${config.EMAIL}>`, // sender address
    to: emailCliente, // list of receivers
    subject: 'Documento solicitado', // Subject line
    html: `<p><b>Su documento Legal Aid se encuentra adjunto</b></p>
             <b>Gracias por utilizar nuestro servicio.</b>
              `,
    attachments: [
      {
        // utf-8 string as an attachment
        filename: `${nombreDocumento}.pdf`,
        content: borrador,
      },
      {
        // utf-8 string as an attachment
        filename: `${nombreDocumento}.docx`,
        content: borradorDocx,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
