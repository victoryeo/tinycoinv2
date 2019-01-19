const mongoose      = require('mongoose')
const config        = require('./config')

const mongoUri = config.mongo.host
/*mongoose.connect(mongoUri, { keepAlive: 10 });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});*/
