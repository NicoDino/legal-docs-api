import app from './App';
import './config/db';
import { PORT } from './config.private';
import { verifyTransporter } from './helpers/mailer';

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server is listening on ${PORT}`);
  console.log('SERVER RUNNING IN ', process.env.NODE_ENV);
  verifyTransporter();
});
