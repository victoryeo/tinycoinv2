const express       = require('express')
const bc            = require('./tinycoin.chain');
const init          = require('./init');

const router = express.Router();

function doListing(req, { limit = 50, skip = 0} = {}) {
  return new Promise((resolve, reject) => {
    console.log(init.blockchain);
    //is consensus here?
    //bc.consensus();
    let chain_to_send = init.blockchain;
    // Convert our blocks into dictionaries
    // so we can send them as json objects later
    resolve(JSON.stringify(chain_to_send));
  })
}

async function list(req, res) {
  const { limit = 15, skip = 0 } = req.query
  console.log('query', req.query)
  const blocks = await doListing(req, {limit, skip})

  return res.json(blocks);
}

router.get('/', (req, res) => {
  blocks = list(req, res)
  //res.send('get blocks');
  //res.status('get blocks').send(JSON.stringify(blocks))
});


module.exports = router;
