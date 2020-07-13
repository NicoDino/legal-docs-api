import app from './App';
import './config/db';
import * as config from '../config.private';

const PORT = config.PORT;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server is listening on ${PORT}`);
  console.log('SERVER RUNNING IN ', process.env.NODE_ENV);
});
