const express       = require('express')
const bc            = require('./tinycoin.chain')
const init          = require('./init')

const router = express.Router()

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

function doListing(address) {
  return new Promise((resolve, reject) => {
    let balance = getWallet(address)
    // Convert our blocks into dictionaries
    // so we can send them as json objects later
    resolve(JSON.stringify(balance))
  })
}

async function list(req, res) {
  const balance = await doListing(req.params.address)

  return res.json(balance);
}

router.get('/:address', (req, res) => {
  console.log(req.params.address)
  balance = list(req, res)
  //res.send('get blocks');
  //res.status('get blocks').send(JSON.stringify(blocks))
});

module.exports = router
