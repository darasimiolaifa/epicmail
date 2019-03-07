import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { exists } from 'fs';

chai.use(chaiHttp);
chai.should();
let url;

describe('Authentication API', () => {
  describe('POST /api/v1/auth/signup', () => {
    beforeEach(() => {
      url = '/api/v1/auth/signup';
    })
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
        .post(url)
        .send({
          firstname: 'Imonitie',
          lastname: 'Yahoo',
          password: 'imonitie.yahoo',
          username: '',
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
        .post(url)
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
  
  describe('POST /api/v1/auth/signin', () => {
    beforeEach(() => {
      url = '/api/v1/auth/signin';
    });
    it('should return a 400 error if any of the fields is missing', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'darasimiolaifa',
          password: '',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.should.be.an('object');
        })
    });
    it('should return a 404 error if no stored username matches the one specified', () => {
      chai.request(app)
        .post(url)
        .send({
          username: 'badUser',
          password: 'badPassword',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status', 404);
          res.body.should.property('error');
          res.body.error.should.include('username');
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
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.property('error');
          res.body.error.should.include('password');
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
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status', 200);
          res.body.should.have.property('token');
          res.body.token.should.be.a('string');
        });
    });
  });
});
