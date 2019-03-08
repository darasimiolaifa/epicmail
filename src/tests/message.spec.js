import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Messages API', () => {
  describe('GET /api/v1/messages', () => {
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
  
  describe('GET /api/v1/messages/unread', () => {
    it('should get all the unread received messages for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .set('Accepts', 'application/json')
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
  
  describe('GET /api/v1/messages/sent', () => {
    it('should get all the sent messages for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('array');
          data.should.have.lengthOf(3);
          data.forEach((mail) => {
            mail.should.satisfy(message => message.status === 'sent');
          });
        });
    });
  });
  describe('GET /api/v1/messages/:id', () => {
    it('should return a 404 error if id does not match any message record in the database', () => {
      chai.request(app)
        .get('/api/v1/messages/11')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(404);
          res.body.should.have.property('status', 404);
          res.body.should.have.property('error');
          error.should.be.a('string');
          error.should.include('Message');
        });
    });
    it('should get a specific message for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages/1')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.satisfy(message => message.id === 1);
        });
    });
  });
});
