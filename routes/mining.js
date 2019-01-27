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
        let walletInst = new col({ address: address, amount: 1})
        walletInst.save((err) => {
          if (err)
            console.log('mongo save error1');
        })
      }
      else {
        col.findOneAndUpdate({"address": address}, {$inc:{"amount":1}}, {},
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

function doMining(req) {
  return new Promise((resolve, reject) => {
    console.log(req.body)
    // Get the last proof of work
    let last_block = init.blockchain[init.blockchain.length - 1]
    let last_proof = last_block.data.pow
    //error checking
    //if (last_proof == undefined)
    //  last_proof = 1

    // Find the proof of work for
    // the current block being mined
    // Note: The program will hang here until a new
    //       proof of work is found
    const proof = bc.proofOfWork(last_proof)

    // Once we find a valid proof of work,
    // we know we can mine a block so
    // we reward the miner by adding a transaction
    init.this_nodes_transactions.push(
        { "from": "network", "to": init.miner_address, "amount": 1 }
    )
    // store into wallet
    //updateWallet(init.miner_address, 1)
    updateWalletDB(init.miner_address, 1)

    // Now we can gather the data needed
    // to create the new block
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
    resolve(JSON.stringify(mined_block))
  })
}

async function mine(req, res) {
  console.log('query', req.query)
  const blocks = await doMining(req)

  return res.json(blocks)
}

router.get('/', (req, res) => {
  blocks = mine(req, res)
})

module.exports = router
