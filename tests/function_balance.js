const bc = require('../routes/init')
const mn = require('../routes/mining')
const chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp);
describe("test balance", () => {
  it("shoud return 200ok", (done) => {
    chai.request(server)
        .get('/balance/456')
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
  })

  it("shoud return balance", (done) => {
    chai.request(server)
        .get('/balance/456')
        .end((err, res) => {
            chai.assert.isAbove(parseInt(res.body, 10), 0)
            done()
        })
  })
})
