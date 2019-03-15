import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Messages API', () => {
  describe('GET /api/v1/messages', () => {
    it('should get all the received messages for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('array');
          data.should.have.lengthOf(5);
          data.forEach((mail) => {
            mail.should.satisfy(message => message.status === 'unread' || message.status === 'read');
          });
        });
    });
  });
  
  describe('GET /api/v1/messages/unread', () => {
    it('should get all the unread received messages for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages/unread')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('array');
          data.should.have.lengthOf(3);
          data.forEach((mail) => {
            mail.should.satisfy(message => message.status === 'unread');
          });
        });
    });
  });
  
  describe('GET /api/v1/messages/sent', () => {
    it('should get all the sent messages for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages/sent')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('array');
          data.should.have.lengthOf(3);
          data.forEach((mail) => {
            mail.should.satisfy(message => message.status === 'sent');
          });
        });
    });
  });
  describe('GET /api/v1/messages/:id', () => {
    it('should return a 404 error if id does not match any message record in the database', () => {
      chai.request(app)
        .get('/api/v1/messages/11')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(404);
          res.body.should.have.property('status', 404);
          res.body.should.have.property('error');
          error.should.be.a('string');
          error.should.include('Message');
        });
    });
    it('should get a specific message for the requester', () => {
      chai.request(app)
        .get('/api/v1/messages/1')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.satisfy(message => message.id === 1);
        });
    });
  });
  describe('DELETE /api/v1/messages/:id', () => {
    it('should return a 404 error if id does not match any message record in the database', () => {
      chai.request(app)
        .delete('/api/v1/messages/11')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(404);
          res.body.should.have.property('status', 404);
          res.body.should.have.property('error');
          error.should.be.a('string');
          error.should.include('Message');
        });
    });
    it('should delete a specific message and return the message string', () => {
      chai.request(app)
        .delete('/api/v1/messages/1')
        .set('Accepts', 'application/json')
        .end((err, res) => {
          const { data } = res.body;
          res.should.have.status(200);
          res.body.should.have.property('status', 200);
          res.body.should.have.property('data');
          data.should.be.an('object');
          data.should.have.a.property('message');
          data.message.should.be.a('string');
        });
    });
  });
  describe('POST /api/v1/messages', () => {
    let message;
    let url;
    beforeEach(() => {
      url = '/api/v1/messages';
      message = 'Fuga enim tempore non voluptas quia vitae ipsam voluptas. Et dolor adipisci dolores sunt non explicabo occaecati rerum nesciunt. Sint est asperiores sit voluptatum mollitia enim iste. Nesciunt minima sequi voluptas optio aut voluptatem. Eligendi voluptates iste eius iure commodi molestiae. Quo ex reprehenderit ipsa incidunt corporis vel in unde. Iste asperiores consequatur ex quidem omnis inventore deserunt. Eligendi officiis voluptatem. In omnis labore consequatur nisi. Excepturi doloremque nam omnis odit labore magni rerum quia. Distinctio adipisci nulla exercitationem omnis illum. Eum cum ipsam consequatur ex accusamus ipsum. Eum inventore laboriosam deleniti omnis occaecati. Culpa occaecati nemo alias et doloribus expedita. Ut quia ut nostrum ducimus occaecati veniam ut exercitationem voluptatibus. Quaerat porro error sint aut aliquid qui. Minus officiis neque dolorem animi maiores et aliquid.';
    });
    it('should return a 400 error for missing inputs', () => {
      chai.request(app)
        .post(url)
        .send({
          snederId: 1,
          subject: '',
          status: 'sent',
          message,
        })
        .end((err, res) => {
          const { error } = res.body;
          res.should.have.status(400);
          res.body.should.have.property('status', 400);
          res.body.should.have.property('error');
          error.should.have.property('missingValues');
          error.emptyValues[0].should.include('subject');
        });
    });
    it('should post a mail that has all the required fields', () => {
      chai.request(app)
        .post(url)
        .send({
          snederId: 1,
          subject: 'Soluta accusamus officiis ut excepturi blanditiis libero ut.',
          status: 'sent',
          message,
        })
        .end((err, res) => {
          const { data } = res.body;
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
