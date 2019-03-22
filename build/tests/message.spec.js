"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.should();

var accessToken;
describe('Messages API', function () {
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
  describe('POST /api/v1/messages', function () {
    var message;
    var url;
    beforeEach(function () {
      url = '/api/v1/messages';
      message = 'Fuga enim tempore non voluptas quia vitae ipsam voluptas. Et dolor adipisci dolores sunt non explicabo occaecati rerum nesciunt. Sint est asperiores sit voluptatum mollitia enim iste. Nesciunt minima sequi voluptas optio aut voluptatem. Eligendi voluptates iste eius iure commodi molestiae. Quo ex reprehenderit ipsa incidunt corporis vel in unde. Iste asperiores consequatur ex quidem omnis inventore deserunt. Eligendi officiis voluptatem. In omnis labore consequatur nisi. Excepturi doloremque nam omnis odit labore magni rerum quia. Distinctio adipisci nulla exercitationem omnis illum. Eum cum ipsam consequatur ex accusamus ipsum. Eum inventore laboriosam deleniti omnis occaecati. Culpa occaecati nemo alias et doloribus expedita. Ut quia ut nostrum ducimus occaecati veniam ut exercitationem voluptatibus. Quaerat porro error sint aut aliquid qui. Minus officiis neque dolorem animi maiores et aliquid.';
    });
    it('should return a 400 error for missing inputs', function (done) {
      _chai.default.request(_server.default).post(url).set('x-access-token', accessToken).send({
        receiverId: 1,
        subject: '',
        status: 'sent',
        message: message
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('missingValues');
        error.emptyValues[0].should.include('subject');
        done();
      });
    });
    it('should post a mail that has all the required fields', function (done) {
      _chai.default.request(_server.default).post(url).set('x-access-token', accessToken).send({
        receiverEmail: 'imonitieyahoo@epicmail.com',
        subject: 'Soluta accusamus officiis ut excepturi blanditiis libero ut.',
        message: message
      }).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('object');
        data.should.have.property('message');
        data.message.should.be.a('object');
        data.message.should.have.property('id');
        data.message.id.should.be.a('number');
        done();
      });
    });
  });
  describe('GET /api/v1/messages', function () {
    it('should get all the received messages of the requester', function (done) {
      _chai.default.request(_server.default).get('/api/v1/messages').set('x-access-token', accessToken).end(function (err, res) {
        var data = res.body.data; // console.log(data);

        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('array');
        data.forEach(function (mail) {
          mail.should.satisfy(function (message) {
            return message.status === 'unread' || message.status === 'read';
          });
        });
        done();
      });
    });
  });
  describe('GET /api/v1/messages/unread', function () {
    it('should get all the unread received messages for the requester', function (done) {
      _chai.default.request(_server.default).get('/api/v1/messages/unread').set('x-access-token', accessToken).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('array');
        data.forEach(function (mail) {
          mail.should.satisfy(function (message) {
            return message.status === 'unread';
          });
        });
        done();
      });
    });
  });
  describe('GET /api/v1/messages/sent', function () {
    it('should get all the sent messages for the requester', function (done) {
      _chai.default.request(_server.default).get('/api/v1/messages/sent').set('x-access-token', accessToken).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('array');
        data.forEach(function (mail) {
          mail.should.satisfy(function (message) {
            return message.sender_id === 1;
          });
        });
        done();
      });
    });
  });
  describe('GET /api/v1/messages/:id', function () {
    it('should return a 404 error if id does not match any message record in the database', function (done) {
      _chai.default.request(_server.default).get('/api/v1/messages/11').set('x-access-token', accessToken).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(404);
        res.body.should.have.property('status', 404);
        res.body.should.have.property('error');
        error.should.be.a('string');
        error.should.include('Message');
        done();
      });
    });
    it('should get a specific message for the requester', function (done) {
      _chai.default.request(_server.default).get('/api/v1/messages/1').set('x-access-token', accessToken).end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('object');
        data.should.satisfy(function (message) {
          return message.id === 1;
        });
        done();
      });
    });
  });
  describe('DELETE /api/v1/messages/:id', function () {
    it('should return a 404 error if id does not match any message record in the database', function (done) {
      _chai.default.request(_server.default).delete('/api/v1/messages/11').set('x-access-token', accessToken).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(404);
        res.body.should.have.property('status', 404);
        res.body.should.have.property('error');
        error.should.be.a('string');
        error.should.include('Message');
        done();
      });
    });
    it('should delete a specific message and return the message string', function (done) {
      _chai.default.request(_server.default).delete('/api/v1/messages/1').set('x-access-token', accessToken).end(function (err, res) {
        var data = res.body.data;
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
//# sourceMappingURL=message.spec.js.map