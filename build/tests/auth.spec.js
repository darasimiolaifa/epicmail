"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-trailing-spaces */
_chai.default.use(_chaiHttp.default);

_chai.default.should();

var url;
describe('Authentication API', function () {
  describe('POST /api/v1/auth/signup', function () {
    beforeEach(function () {
      url = '/api/v1/auth/signup';
    });
    it('should sign up the new user and return a token', function () {
      _chai.default.request(_server.default).post(url).send({
        username: 'imonitie.yahoo',
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
      });
    });
    it('should return an error when one of the field is missing', function () {
      _chai.default.request(_server.default).post(url).send({
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
      });
    });
    it('should return an error for a username already in the database', function () {
      _chai.default.request(_server.default).post(url).send({
        username: 'darasimiolaifa',
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
      });
    });
    it('should return an error for a username that contains invalid characters', function () {
      _chai.default.request(_server.default).post(url).send({
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
      });
    });
    it('should reject passwords with less than 8 characters', function () {
      _chai.default.request(_server.default).post(url).send({
        username: 'darasimiolaifa',
        firstName: 'Isaiah',
        lastName: 'Ibikunle',
        password: 'monk'
      }).end(function (req, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('invalidInput');
        error.invalidInput.should.be.an('object');
        error.invalidInput.should.have.property('password');
      });
    });
  });
  describe('POST /api/v1/auth/login', function () {
    beforeEach(function () {
      url = '/api/v1/auth/login';
    });
    it('should return a 400 error if any of the fields is missing', function () {
      _chai.default.request(_server.default).post(url).send({
        username: 'darasimiolaifa',
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
      });
    });
    it('should return a 404 error if no stored username matches the one specified', function () {
      _chai.default.request(_server.default).post(url).send({
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
      });
    });
    it('should return a 400 error the stored password does not match the one specified', function () {
      _chai.default.request(_server.default).post(url).send({
        username: 'darasimiolaifa',
        password: 'wrongpassword'
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.property('error');
        error.should.have.property('invalidInput');
        error.invalidInput.should.be.an('object');
        error.invalidInput.should.have.property('password');
      });
    });
    it('should sign in the new user and return a token', function () {
      _chai.default.request(_server.default).post(url).send({
        username: 'darasimiolaifa',
        password: 'darasimiolaifa'
      }).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status', 200);
        data.should.have.property('token');
        data.token.should.be.a('string');
      });
    });
  });
});
//# sourceMappingURL=auth.spec.js.map