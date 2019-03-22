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
          description: 'A group to hold details for Andelan cycle 42 Bootcampers',
        })
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.have.property('name');
          data.name.should.be.a('string');
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
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          requestId = data[0].id;
          data.should.be.an('array');
          data.forEach((group) => {
            group.should.have.property('name');
            group.should.have.property('id');
          });
          done();
        });
    });
  });
  describe('PATCH /api/v1/groups/1/name', () => {
    it('should edit the name of a group', (done) => {
      chai.request(app)
        .patch('/api/v1/groups/1/name')
        .set('x-access-token', accessToken)
        .send({
          groupId: requestId,
          name: 'andelabootcampers',
        })
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.have.property('name');
          done();
        });
    });
  });
  describe('POST /api/v1/groups/1/users', () => {
    it('should add user to a group', (done) => {
      chai.request(app)
        .post('/api/v1/groups/1/users')
        .set('x-access-token', accessToken)
        .send({
          username: 'imonitieyahoo',
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
  describe('DELETE /api/v1/groups/1/users/1', () => {
    it('should delete a specific user from a group', (done) => {
      chai.request(app)
        .delete('/api/v1/groups/1/users/1')
        .set('x-access-token', accessToken)
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.have.property('message');
          done();
        });
    });
  });
  describe('DELETE /api/v1/groups/1', () => {
    it('should delete a group that belongs to the requester', (done) => {
      chai.request(app)
        .delete('/api/v1/groups/1')
        .set('x-access-token', accessToken)
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.have.property('message');
          data.message.should.have.property('id');
          done();
        });
    });
  });
});
