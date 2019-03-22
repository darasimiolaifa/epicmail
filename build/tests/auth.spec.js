"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.should();

describe('Authentication API', function () {
  describe('POST /api/v1/auth/signup', function () {
    it('should sign up the new user and return a token', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/signup').send({
        username: 'imonitieyahoo',
        firstName: 'Imonitie',
        lastName: 'Yahoo',
        password: 'imonitie.yahoo'
      }).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(201); // eslint-disable-next-line no-unused-expressions

        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status', 201);
        res.body.should.have.property('data');
        data.should.be.a('object');
        data.should.have.property('token');
        done();
      });
    });
    it('should return an error when one of the field is missing', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/signup').send({
        firstName: 'Imonitie',
        lastName: 'Yahoo',
        password: '',
        username: 'imonitie.yahoo'
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.not.have.property('data');
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('missingValues');
        error.emptyValues.should.be.an('array');
        error.emptyValues[0].should.include('password');
        done();
      });
    });
    it('should return an error for a username already in the database', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/signup').send({
        username: 'imonitieyahoo',
        firstName: 'Isaiah',
        lastName: 'Ibikunle',
        password: 'monkeys4real'
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('invalidInput');
        error.invalidInput.should.be.an('object');
        error.invalidInput.should.have.property('username');
        done();
      });
    });
    it('should return an error for a username that contains invalid characters', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/signup').send({
        username: '$#@ollarjay)(',
        firstName: 'Isaiah',
        lastName: 'Ibikunle',
        password: 'monkeys4real'
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('invalidInput');
        error.invalidInput.should.be.an('object');
        error.invalidInput.should.have.property('username');
        done();
      });
    });
    it('should reject passwords with less than 8 characters', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/signup').send({
        username: 'darasimiolaifa',
        firstName: 'Isaiah',
        lastName: 'Ibikunle',
        password: 'monk'
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('invalidInput');
        error.invalidInput.should.be.an('object');
        error.invalidInput.should.have.property('password');
        done();
      });
    });
  });
  describe('POST /api/v1/auth/login', function () {
    it('should return a 400 error if any of the fields is missing', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/login').send({
        username: 'imonitieyahoo',
        password: ''
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.not.have.property('data');
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('missingValues');
        error.emptyValues.should.be.an('array');
        error.emptyValues[0].should.include('password');
        done();
      });
    });
    it('should return a 404 error if no stored username matches the one specified', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/login').send({
        username: 'badUser',
        password: 'badPassword'
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(404);
        res.body.should.have.property('status', 404);
        res.body.should.have.property('error');
        error.should.have.property('invalidInput');
        error.invalidInput.should.be.an('object');
        error.invalidInput.should.have.property('username');
        done();
      });
    });
    it('should return a 400 error the stored password does not match the one specified', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/login').send({
        username: 'imonitieyahoo',
        password: 'wrongpassword'
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.property('error');
        error.should.have.property('invalidInput');
        error.invalidInput.should.be.an('object');
        error.invalidInput.should.have.property('password');
        done();
      });
    });
    it('should sign in the new user and return a token', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/login').send({
        username: 'imonitieyahoo',
        password: 'imonitie.yahoo'
      }).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status', 200);
        data.should.have.property('token');
        data.token.should.be.a('string');
        done();
      });
    });
  });
});
//# sourceMappingURL=auth.spec.js.map