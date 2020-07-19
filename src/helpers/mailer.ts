import { EMAIL, MAIL_PASS } from '../config.private';
import path = require('path');
import * as handlebars from 'handlebars';
import * as fs from 'fs';

const nodemailer = require('nodemailer');

export async function sendToken(usuario, newToken) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: EMAIL, // generated ethereal user
      pass: MAIL_PASS, // generated ethereal password
    },
  });

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
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: EMAIL, // generated ethereal user
      pass: MAIL_PASS, // generated ethereal password
    },
  });
  const filePath = path.join(__dirname, '../templates/emails/send_borrador.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
  };
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
