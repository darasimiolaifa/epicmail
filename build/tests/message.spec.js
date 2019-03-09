"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.should();

describe('Messages API', function () {
  describe('GET /api/v1/messages', function () {
    it('should get all the received messages for the requester', function () {
      _chai.default.request(_server.default).get('/api/v1/messages').set('Accepts', 'application/json').end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('array');
        data.should.have.lengthOf(5);
        data.forEach(function (mail) {
          mail.should.satisfy(function (message) {
            return message.status === 'unread' || message.status === 'read';
          });
        });
      });
    });
  });
  describe('GET /api/v1/messages/unread', function () {
    it('should get all the unread received messages for the requester', function () {
      _chai.default.request(_server.default).get('/api/v1/messages/unread').set('Accepts', 'application/json').end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('array');
        data.should.have.lengthOf(3);
        data.forEach(function (mail) {
          mail.should.satisfy(function (message) {
            return message.status === 'unread';
          });
        });
      });
    });
  });
  describe('GET /api/v1/messages/sent', function () {
    it('should get all the sent messages for the requester', function () {
      _chai.default.request(_server.default).get('/api/v1/messages/sent').set('Accepts', 'application/json').end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('array');
        data.should.have.lengthOf(3);
        data.forEach(function (mail) {
          mail.should.satisfy(function (message) {
            return message.status === 'sent';
          });
        });
      });
    });
  });
  describe('GET /api/v1/messages/:id', function () {
    it('should return a 404 error if id does not match any message record in the database', function () {
      _chai.default.request(_server.default).get('/api/v1/messages/11').set('Accepts', 'application/json').end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(404);
        res.body.should.have.property('status', 404);
        res.body.should.have.property('error');
        error.should.be.a('string');
        error.should.include('Message');
      });
    });
    it('should get a specific message for the requester', function () {
      _chai.default.request(_server.default).get('/api/v1/messages/1').set('Accepts', 'application/json').end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('object');
        data.should.satisfy(function (message) {
          return message.id === 1;
        });
      });
    });
  });
  describe('DELETE /api/v1/messages/:id', function () {
    it('should return a 404 error if id does not match any message record in the database', function () {
      _chai.default.request(_server.default).delete('/api/v1/messages/11').set('Accepts', 'application/json').end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(404);
        res.body.should.have.property('status', 404);
        res.body.should.have.property('error');
        error.should.be.a('string');
        error.should.include('Message');
      });
    });
    it('should delete a specific message and return the message string', function () {
      _chai.default.request(_server.default).delete('/api/v1/messages/1').set('Accepts', 'application/json').end(function (err, res) {
        var data = res.body.data;
        res.should.have.status(200);
        res.body.should.have.property('status', 200);
        res.body.should.have.property('data');
        data.should.be.an('object');
        data.should.have.a.property('message');
        data.message.should.be.a('string');
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
    it('should return a 400 error for missing inputs', function () {
      _chai.default.request(_server.default).post(url).send({
        snederId: 1,
        subject: '',
        status: 'sent',
        message: message
      }).end(function (err, res) {
        var error = res.body.error;
        res.should.have.status(400);
        res.body.should.have.property('status', 400);
        res.body.should.have.property('error');
        error.should.have.property('missingValues');
        error.missingValues.should.include('subject');
      });
    });
    it('should post a mail that hass all the required fields', function () {
      _chai.default.request(_server.default).post(url).send({
        snederId: 1,
        subject: 'Soluta accusamus officiis ut excepturi blanditiis libero ut.',
        status: 'sent',
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
      });
    });
  });
});
//# sourceMappingURL=message.spec.js.map