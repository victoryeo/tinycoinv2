const express       = require('express')
const bc            = require('./tinycoin.chain')
const init          = require('./init')
const col           = require('../mongoose')

const router = express.Router();

function updateWalletDB(address, amount) {
  console.log('address', address)
  col.find({address: address}, function(err, data) {
    if (err) {
      console.log('mongo find error1')
    }
    else {
      if (data.length == 0) {
        console.log('null data')
        let walletInst = new col({ address: address, amount: amount})
        walletInst.save((err) => {
          if (err)
            console.log('mongo save error1');
        })
      }
      else {
        col.findOneAndUpdate({"address": address}, {$inc:{"amount":amount}}, {},
         (err, data) => {
          if (err)
            console.log('find error1')
          else
            console.log(data)
        })
      }
    }
  })
}

// function updateWallet(address, amount) {
//   console.log('wallet entry', init.wallet.length)
//   console.log('address', address)
//   for (var i = 0; i < init.wallet.length; i++) {
//     if (init.wallet[i].address === address) {
//       init.wallet[i].amount += amount
//       console.log('amount', init.wallet[i].amount)
//       return
//     }
//   }
//   init.wallet.push({"address": address, "amount": amount})
// }

function newMining(from_address, to_address, amount) {
  // Get the last proof of work
  let last_block = init.blockchain[init.blockchain.length - 1]
  let last_proof = last_block.data.pow

  // Find the proof of work for
  // the current block being mined
  // Note: The program will hang here until a new
  //       proof of work is found
  const proof = bc.proofOfWork(last_proof)

  // this step is already done in caller function
  // init.this_nodes_transactions.push(
  //     { "from": from_address, "to": to_address, "amount": amount }
  // )

  // store into wallet
  //updateWallet(to_address, parseInt(amount,10))
  updateWalletDB(to_address, parseInt(amount,10))

  // the new block data needed is gathered
  new_block_data = {
      pow: proof,
      transactions: init.this_nodes_transactions
  };
  let new_block_index = init.blockchain.indexOf(last_block) + 1
  // Empty transaction list
  init.this_nodes_transactions = []
  // Now create the new block!
  const mined_block = bc.createNextBlock(last_block, new_block_data)
  init.blockchain.push(mined_block)
}

function doTx(req) {
  return new Promise((resolve, reject) => {
    console.log(req.body)
    let new_txion = req.body
    //we add the transaction to our list
    init.this_nodes_transactions.push(new_txion)
    // Because the transaction was successfully
    // submitted, we log it to our console
    console.log("New transaction")
    console.log("FROM: " + new_txion['from'])
    console.log("TO: " + new_txion['to'])
    console.log("AMOUNT: " + new_txion['amount'])

    //add the new block
    newMining(new_txion['from'], new_txion['to'], new_txion['amount'])

    // Then we let the client know it worked out
    resolve(JSON.stringify(new_txion))
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
})

module.exports = router
