import config from "../config/config";

const nodemailer = require("nodemailer");

export async function sendToken(usuario, newToken) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
   service:'gmail',
    auth: {
      user: `"LEGAL AID" <${config.EMAIL}>`, // generated ethereal user
      pass: config.MAIL_PASS, // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `Legal Aid`, // sender address
    to: usuario.email, // list of receivers
    subject: "Código solicitado", // Subject line
    html: `<p><b>Utilice el siguiente código para reestablecer sus credenciales</b></p>
             <p> <b> ${newToken}</b></p> <br>
             <b>Gracias por utilizar nuestro servicio.</b>
              `,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}
