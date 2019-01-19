
let Init = module.exports = {
  // A completely random address of the owner of this node
  miner_address: "q3nf394hjg-random-miner-address-34nf3i4nflkn3oi",

  // Store the transactions that
  // this node has in a list
  this_nodes_transactions: [],
  // A variable to deciding if we're mining or not
  mining: 1,
  // Store the url data of every
  // other node in the network
  // so that we can communicate with them
  peer_nodes: [],
  // store the blockchain
  blockchain: [],

}
