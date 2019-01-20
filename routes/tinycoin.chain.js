// snakecoin implementation in javascript
// reference from medium.com article below
// https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b

const sha256 = require('js-sha256')
const request = require('request')
const init = require('./init')

// Define the Block Class
class Block {
  constructor(index, data, previousHash) {
    this.index = index;
    this.timestamp = new Date();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
  }

  generateHash() {
    return sha256.hex(`${this.index}${this.timestamp}${this.data}${this.previousHash}`);
  }
}

// Create genesis block
const createGenesisBlock = () =>  {
  console.log('genesis')
  return new Block(0, { pow: 9, transactions: null}, '0');
}

// Create all other blocks
const createNextBlock = (previousBlock, data = null) => {
  const index = previousBlock.index + 1;
  const previousHash = previousBlock.hash;
  return new Block(index, data, previousHash);
}

const findNewChains = () => {
  // Get the blockchains of every
  // other node
  let other_chains = []
  init.peer_nodes.forEach((node_url) => {
    // Get their chains using a GET request
    let httpurl = node_url + "/blocks";
    request.get(httpurl, (error, res, body) => {
      if (error) {
        console.error(error)
        return [];
      }
      // Add it to our list
      other_chains.push(JSON.parse(body));
    })
  })
  return other_chains;
}

const consensus = () => {
  // Get the blocks from other nodes
  let other_chains = findNewChains();
  // If our chain isn't longest,
  // then we store the longest chain
  let longest_chain = init.blockchain;
  other_chains.forEach((chain) => {
    if (longest_chain.length < chain.length)
      longest_chain = chain;
  });
  // If the longest chain isn't ours,
  // then we stop mining and set
  // our chain to the longest one
  init.blockchain = longest_chain;
}

const proofOfWork = (lastProof) => {
  // Create a variable that we will use to find
  // our next proof of work
  let incrementor = lastProof + 1;
  // Keep incrementing the incrementor until
  // it's equal to a number divisible by 9
  // and the proof of work of the previous
  // block in the chain
  while  (!((incrementor % 9 == 0) && (incrementor % lastProof == 0))) {
    //console.log(incrementor, lastProof);
    incrementor += 1;
  }
  return incrementor;
}

module.exports = {
  createGenesisBlock,
  createNextBlock,
  proofOfWork,
  consensus,
};
