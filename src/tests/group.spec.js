import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();
let accessToken;
const url = '/api/v1/groups';
let requestId;

describe('Groups API', () => {
  describe('Login functionality', () => {
    it('should log in a registered user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'imonitieyahoo',
          password: 'imonitie.yahoo',
        })
        .end((err, res) => {
          const { data } = res.body;
          accessToken = data.token;
          res.should.has.status(200);
          done();
        });
    });
  });
  describe('POST /api/v1/groups', () => {
    it('should return a 400 error for missing inputs', (done) => {
      chai.request(app)
        .post(url)
        .set('x-access-token', accessToken)
        .send({
          name: ' ',
          description: 'A group to hold details for Andelan cycle 42 Bootcampers',
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          error.should.have.property('missingValues');
          error.emptyValues[0].should.include('name');
          done();
        });
    });
    it('should create a group that has all the details', (done) => {
      chai.request(app)
        .post(url)
        .set('x-access-token', accessToken)
        .send({
          name: 'Andela Cycle 42 Bootcampers',
          decsription: 'A group to hold details for Andelan cycle 42 Bootcampers',
        })
        .end((err, res) => {
          const { data } = res.body;
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.have.property('name');
          data.message.name.should.be('Andela Cycle 42 Bootcampers');
          done();
        });
    });
  });
  describe('GET /api/v1/groups', () => {
    it('should get all the groups registered by the requester', (done) => {
      chai.request(app)
        .get('/api/v1/groups')
        .set('x-access-token', accessToken)
        .end((err, res) => {
          const { data } = res.body;
          // console.log(data);
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          requestId = data[0].id;
          data.should.be.an('array');
          data.forEach((mail) => {
            mail.should.satisfy((group) => {
              group.should.include.have.property('name');
              group.should.include.have.property('id');
            });
          });
          done();
        });
    });
  });
  describe('PATCH /api/v1/groups/:groupId/name', () => {
    it('should get all the unread received messages for the requester', (done) => {
      chai.request(app)
        .patch('/api/v1/messages/unread')
        .set('x-access-token', accessToken)
        .send({
          grouId: requestId,
          name: 'Andelan Bootcampers',
        })
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('array');
          data.forEach((mail) => {
            mail.should.satisfy(message => message.status === 'unread');
          });
          done();
        });
    });
  });
  describe('POST /api/v1/groups/:groupId/users', () => {
    it('should get all the sent messages for the requester', (done) => {
      chai.request(app)
        .post('/api/v1/groups/:groupId/users')
        .set('x-access-token', accessToken)
        .send({
          groupId: requestId,
          userEmail: 'imonitieyahoo@epicmail.com',
        })
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          done();
        });
    });
  });
  describe('GET /api/v1/messages/:id', () => {
    it('should return a 404 error if id does not match any message record in the database', (done) => {
      chai.request(app)
        .get('/api/v1/messages/11')
        .set('x-access-token', accessToken)
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(404);
          res.body.should.have.property('status', 404);
          res.body.should.have.property('error');
          error.should.be.a('string');
          error.should.include('Message');
          done();
        });
    });
    it('should get a specific message for the requester', (done) => {
      chai.request(app)
        .get('/api/v1/messages/1')
        .set('x-access-token', accessToken)
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.satisfy(message => message.id === 1);
          done();
        });
    });
  });
  describe('DELETE /api/v1/messages/:id', () => {
    it('should return a 404 error if id does not match any message record in the database', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/11')
        .set('x-access-token', accessToken)
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(404);
          res.body.should.have.property('status', 404);
          res.body.should.have.property('error');
          error.should.be.a('string');
          error.should.include('Message');
          done();
        });
    });
    it('should delete a specific message and return the message string', (done) => {
      chai.request(app)
        .delete('/api/v1/messages/1')
        .set('x-access-token', accessToken)
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.have.a.property('message');
          data.message.should.be.a('string');
          done();
        });
    });
  });
});
