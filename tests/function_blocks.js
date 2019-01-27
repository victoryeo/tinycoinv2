const bc = require('../routes/init')
const mn = require('../routes/mining')
const chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
let should = chai.should()

chai.use(chaiHttp);
describe("test get blocks", () => {
  it("shoud get blocks", (done) => {
    chai.request(server)
        .get('/blocks')
        .end((err, res) => {
            res.should.have.status(200)

            done()
        })
  })
})
