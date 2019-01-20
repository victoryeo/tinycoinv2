const express       = require('express')
const bc            = require('./tinycoin.chain')
const init          = require('./init')
const col           = require('../mongoose')

const router = express.Router()

function getWalletDB(address) {
  return new Promise((resolve, reject) => {
    console.log('address', address)
    col.find({address: address}, {amount:1, _id:0}, function(err, data) {
      if (err) {
        console.log('mongo find error1')
        amount = 0
      }
      else {
        amount = data[0].amount
      }
      resolve(amount)
    })
  })
}

function getWallet(address) {
  console.log('wallet entry', init.wallet.length)
  console.log('address', address)
  for (var i = 0; i < init.wallet.length; i++) {
    if (init.wallet[i].address === address) {
      console.log('amount', init.wallet[i].amount)
      return init.wallet[i].amount
    }
  }
}

async function doBalance(req, res) {
    let address = req.params.address
    //let balance = getWallet(address)    
    let balance = await getWalletDB(address)
    console.log('balance',balance)
    // Convert our balance into dictionaries
    // so we can send them as json objects later
    return(res.json(JSON.stringify(balance)))
}

router.get('/:address', (req, res) => {
  console.log(req.params.address)
  balance = doBalance(req, res)
  //res.send('get blocks');
  //res.status('get blocks').send(JSON.stringify(blocks))
});

module.exports = router
