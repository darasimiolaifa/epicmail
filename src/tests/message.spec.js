import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Messages API', () => {
  describe('/api/v1/messages', () => {
    it('should get all the received messages for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('array');
          data.should.have.lengthOf(5);
          data.forEach((mail) => {
            mail.should.satisfy(message => message.status === 'unread' || message.status === 'read');
          });
        });
    });
  });
  
  describe('/api/v1/messages/unread', () => {
    it('should get all the unread received messages for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .send('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('array');
          data.should.have.lengthOf(3);
          data.forEach((mail) => {
            mail.should.satisfy(message => message.status === 'unread');
          });
        });
    });
  });
});
