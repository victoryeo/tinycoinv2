const bc = require('../routes/init')
const mn = require('../routes/mining')
const chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp);
describe("test txion", () => {
  it("shoud return 200ok", (done) => {
    chai.request(server)
        .post('/txion')
        .type('form')
        .send({
          'from': 123,
          'to': 456,
          'amount': 1
        })
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
  })

  it("shoud return new tx", (done) => {
    chai.request(server)
        .post('/txion')
        .type('form')
        .send({
          'from': 123,
          'to': 456,
          'amount': 1
        })
        .end((err, res) => {
            //console.log(res.body)
            res.should.be.json
            done()
        })
  })
})
