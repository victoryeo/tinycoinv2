const mongoose      = require('mongoose')
const config        = require('./config')

//mongoose.Promise = Promise

const mongoUri = config.mongo.host
mongoose.connect(mongoUri, { keepAlive: 10 })

let db = mongoose.connection
db.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
});

let schema = mongoose.Schema

let walletSchema = new schema({
    address: String,
    amount:  Number
})

let walletModel = mongoose.model('walletModel', walletSchema)
//console.log(walletModel)

let walletInst = new walletModel({ address: '010203', amount: 1})
walletInst.save((err) => {
  if (err)
    console.log('mongo save error1');
})

walletModel.find({address: '010203'}, function(err, data) {
  if (err)
    console.log('find error')
  // else
  //   console.log(data)
})
walletModel.findOneAndUpdate({"address": '010203'}, {$inc:{"amount":2}}, {},
 (err, data) => {
  if (err)
    console.log('find error')
  else
    console.log(data)
})

//the code below creates a new data row
// walletInst.amount=3
// walletInst.save((err) => {
//   if (err)
//     console.log('mongo save error3');
// })
