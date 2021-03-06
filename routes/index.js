const express       = require('express')
const blocks        = require('./blocks')
const mining        = require('./mining')
const txion         = require('./txion')
const balance       = require('./balance')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ api: 'v0.0.1' })
})

router.use('/blocks', blocks)

router.use('/mining', mining)

router.use('/txion', txion)

router.use('/balance', balance)

module.exports = router
