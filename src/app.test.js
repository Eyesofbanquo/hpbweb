var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('./app');

var expect = chai.expect;

chai.should();

chai.use(chaiHttp);

describe("App Test", () => {
  context('GET Requests', () => {

    it('should successfully return quick-search data', (done) => {
      chai.request(app)
      .get('/search/search')
      .end((error, response) => {
        response.should.have.status(200);
        done();
      })
    })

    it('should successfully return top-results data', (done) => {
      chai.request(app)
      .get('/search/top-results')
      .end((error, response) => {
        response.should.have.status(200);
        done();
      })
    })

    it('should successfully return live-search data', (done) => {
      chai.request(app)
      .get('/search/live-search')
      .end((error, response) => {
        response.should.have.status(200);
        done();
      })
    })

    it('should successfully return product data', (done) => {
      chai.request(app)
      .get('/product')
      .end((error, response) => {
        response.should.have.status(233300);
        done();
      })
    })
  })
});