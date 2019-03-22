"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.should();

var accessToken;
var url = '/api/v1/groups';
var requestId;
describe('Groups API', function () {
  describe('Login functionality', function () {
    it('should log in a registered user', function (done) {
      _chai.default.request(_server.default).post('/api/v1/auth/login').send({
        username: 'imonitieyahoo',
        password: 'imonitie.yahoo'
      }).end(function (err, res) {
        var data = res.body.data;
        accessToken = data.token;
        res.should.has.status(200);
        done();
      });
    });
  });
  describe('POST /api/v1/groups', function () {
    it('should return a 400 error for missing inputs', function (done) {
      _chai.default.request(_server.default).post(url).set('x-access-token', accessToken).send({
        name: ' ',
        description: 'A group to hold details for Andelan cycle 42 Bootcampers'
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('missingValues');
        error.emptyValues[0].should.include('name');
        done();
      });
    });
    it('should create a group that has all the details', function (done) {
      _chai.default.request(_server.default).post(url).set('x-access-token', accessToken).send({
        name: 'Andela Cycle 42 Bootcampers',
        description: 'A group to hold details for Andelan cycle 42 Bootcampers'
      }).end(function (err, res) {
        var data = res.body.data;
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
  describe('GET /api/v1/groups', function () {
    it('should get all the groups registered by the requester', function (done) {
      _chai.default.request(_server.default).get('/api/v1/groups').set('x-access-token', accessToken).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        requestId = data[0].id;
        data.should.be.an('array');
        data.forEach(function (group) {
          group.should.have.property('name');
          group.should.have.property('id');
        });
        done();
      });
    });
  });
  describe('PATCH /api/v1/groups/1/name', function () {
    it('should edit the name of a group', function (done) {
      _chai.default.request(_server.default).patch('/api/v1/groups/1/name').set('x-access-token', accessToken).send({
        groupId: requestId,
        name: 'andelabootcampers'
      }).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('object');
        data.should.have.property('name');
        done();
      });
    });
  });
  describe('POST /api/v1/groups/1/users', function () {
    it('should add user to a group', function (done) {
      _chai.default.request(_server.default).post('/api/v1/groups/1/users').set('x-access-token', accessToken).send({
        username: 'imonitieyahoo'
      }).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('object');
        done();
      });
    });
  });
  describe('DELETE /api/v1/groups/1/users/1', function () {
    it('should delete a specific user from a group', function (done) {
      _chai.default.request(_server.default).delete('/api/v1/groups/1/users/1').set('x-access-token', accessToken).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('object');
        data.should.have.property('message');
        done();
      });
    });
  });
  describe('DELETE /api/v1/groups/1', function () {
    it('should delete a group that belongs to the requester', function (done) {
      _chai.default.request(_server.default).delete('/api/v1/groups/1').set('x-access-token', accessToken).end(function (err, res) {
        var data = res.body.data;
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
//# sourceMappingURL=group.spec.js.map