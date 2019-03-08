import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

let url;

describe('Messages API', () => {
  describe('/api/v1/messages', () => {
    it('should get all the received messages for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages')
        .set('Accept', 'application/json')
        .end((err, res) => {
          console.log(res.header);
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data.should.have.lengthOf(5);
        });
    });
  });
});