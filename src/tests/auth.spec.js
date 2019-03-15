/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();
let url;

describe('Authentication API', () => {
  describe('POST /api/v1/auth/signup', () => {
    beforeEach(() => {
      url = '/api/v1/auth/signup';
    });
    it('should sign up the new user and return a token', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'imonitie.yahoo',
          firstname: 'Imonitie',
          lastname: 'Yahoo',
          password: 'imonitie.yahoo',
        })
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(201);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status', 201);
          res.body.should.have.property('data');
          data.should.be.a('object');
          data.should.have.property('token');
        });
    });
    it('should return an error when one of the field is missing', () => {
      chai.request(app)
        .post(url)
        .send({
          firstname: 'Imonitie',
          lastname: 'Yahoo',
          password: '',
          username: 'imonitie.yahoo',
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          res.body.should.not.have.property('data');
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          error.should.have.property('missingValues');
          error.missingValues.should.be.an('array');
          error.missingValues[0].should.include('password');
        });
    });
    it('should return an error for a username already in the database', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'darasimiolaifa',
          firstname: 'Isaiah',
          lastname: 'Ibikunle',
          password: 'monkeys4real',
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          error.should.have.property('invalidInput');
          error.invalidInput.should.be.an('object');
          error.invalidInput.should.have.property('username');
        });
    });
    it('should return an error for a username that contains invalid characters', () => {
      chai.request(app)
        .post(url)
        .send({
          username: '$#@ollarjay)(',
          firstname: 'Isaiah',
          lastname: 'Ibikunle',
          password: 'monkeys4real',
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          error.should.have.property('invalidInput');
          error.invalidInput.should.be.an('object');
          error.invalidInput.should.have.property('username');
        });
    });
    it('should reject passwords with less than 8 characters', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'darasimiolaifa',
          firstname: 'Isaiah',
          lastname: 'Ibikunle',
          password: 'monk',
        })
        .end((req, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          error.should.have.property('invalidInput');
          error.invalidInput.should.be.an('object');
          error.invalidInput.should.have.property('password');
        });
    });
  });
  
  describe('POST /api/v1/auth/login', () => {
    beforeEach(() => {
      url = '/api/v1/auth/login';
    });
    it('should return a 400 error if any of the fields is missing', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'darasimiolaifa',
          password: '',
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          res.body.should.not.have.property('data');
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          error.should.have.property('missingValues');
          error.missingValues.should.be.an('array');
          error.missingValues[0].should.include('password');
        });
    });
    it('should return a 404 error if no stored username matches the one specified', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'badUser',
          password: 'badPassword',
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(404);
          res.body.should.have.property('status', 404);
          res.body.should.have.property('error');
          error.should.have.property('invalidInput');
          error.invalidInput.should.be.an('object');
          error.invalidInput.should.have.property('username');
        });
    });
    it('should return a 400 error the stored password does not match the one specified', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'darasimiolaifa',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.property('error');
          error.should.have.property('invalidInput');
          error.invalidInput.should.be.an('object');
          error.invalidInput.should.have.property('password');
        });
    });
    it('should sign in the new user and return a token', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'darasimiolaifa',
          password: 'darasimiolaifa',
        })
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status', 200);
          data.should.have.property('token');
          data.token.should.be.a('string');
        });
    });
  });
});
