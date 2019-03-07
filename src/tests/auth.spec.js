import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Authentication API', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should sign up the new user and return a token', () => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'imonitie.yahoo',
          firstname: 'Imonitie',
          lastname: 'Yahoo',
          password: 'imonitie.yahoo',
        })
        .end((err, res) => {
          res.should.have.status(201);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status', 201);
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
        });
    });
    it('should return an error when one of the field is missing', () => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Imonitie',
          lastname: 'Yahoo',
          password: 'imonitie.yahoo',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.not.have.property('data');
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
        });
    });
    it('should return an error for a username already in the database', () => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          username: 'darasimiolaifa',
          firstname: 'Isaiah',
          lastname: 'Ibikunle',
          password: 'monkeys4real',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          res.body.error.should.include('username');
        });
    });
  });
});
