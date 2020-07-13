import * as mongoose from 'mongoose';
import { DB_HOST } from '../../config.private';
mongoose.set('useCreateIndex', true);

// Connecting to the database
export default (async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    // listen for requests
    console.log('The Conection is Ok');
  } catch (err) {
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
