import { EMAIL, MAIL_PASS, SMPT_HOST, SMTP_PORT } from '../config.private';
import path = require('path');
import * as handlebars from 'handlebars';
import * as fs from 'fs';

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: SMPT_HOST,
  port: SMTP_PORT,
  secure: true,
  requireTLS: true,
  auth: {
    user: EMAIL, // generated ethereal user
    pass: MAIL_PASS, // generated ethereal password
  },
});

export function verifyTransporter() {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
}

export async function sendToken(usuario, newToken) {
  // setup email data with unicode symbols
  const mailOptions = {
    from: `Legal Aid - <${EMAIL}>`, // sender address
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

export async function sendBorrador(emailCliente, borrador, nombreDocumento) {
  // create reusable transporter object using the default SMTP transport

  const filePath = path.join(__dirname, '../../templates/emails/send_borrador.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {};
  const htmlToSend = template(replacements);
  // setup email data with unicode symbols
  const mailOptions = {
    from: `Legal Aid - <${EMAIL}>`, // sender address
    to: emailCliente, // list of receivers
    subject: 'Documento solicitado', // Subject line
    html: htmlToSend,
    attachments: [
      {
        // utf-8 string as an attachment
        filename: `${nombreDocumento}.pdf`,
        content: borrador,
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
