const express       = require('express')
const bc            = require('./tinycoin.chain');
const init          = require('./init');

const router = express.Router();

function doTx(req) {
  return new Promise((resolve, reject) => {
    console.log(req.body);
    let new_txion = req.body;
    //we add the transaction to our list
    init.this_nodes_transactions.push(new_txion);
    // Because the transaction was successfully
    // submitted, we log it to our console
    console.log("New transaction");
    console.log("FROM: " + new_txion['from']);
    console.log("TO: " + new_txion['to']);
    console.log("AMOUNT: " + new_txion['amount']);
    // Then we let the client know it worked out
    resolve(JSON.stringify(new_txion));
    //res.send("Transaction submission successful");
  })
}

async function transfer(req, res) {
  console.log('query', req.query)
  const blocks = await doTx(req)

  return res.json(blocks);
}

router.post('/', (req, res) => {
  blocks = transfer(req, res)
});

module.exports = router;
