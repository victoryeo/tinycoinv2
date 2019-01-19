const mongoose      = require('./mongoose')
const config        = require('./config')
const express       = require('express')
const logger        = require('morgan')
const bodyParser    = require('body-parser')
const helmet        = require('helmet')
const cors          = require('cors')
const index         = require('./routes/index')
const bc            = require('./routes/tinycoin.chain');
const init          = require('./routes/init')

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'))
}

// Create the Blockchain
init.blockchain.push(bc.createGenesisBlock());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/', index)

app.set('port', config.port)
// listen on port config.port
app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`) // eslint-disable-line no-console
});
