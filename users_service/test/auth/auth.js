const { connectDB } = require('../../index');
const chai = require('chai');
chai.should();

const { auth } = require('../../services/index');
const user = require('../User');
const call = request => ({
  request,
});

describe('#auth()', () => {
  before(done => {
    connectDB(err => {
      if (err) {
        console.log('DB connect error');
        return done();
      }
      console.log('DB has been connected');
      return done();
    });
  });

  it('Check user', done => {
    const request = call({
      token: user.token,
    });

    auth(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(true);
      value.should.have.property('user');
      value.user.should.be.an('object');
      value.user.should.have.property('name');
      value.user.should.have.property('email');
      value.user.should.have.property('role');
      value.user.should.have.property('password');
      return done();
    });
  });
  it('Check user with wrong token', done => {
    const request = call({
      token: '6e443b5ed1fc18416b87ba1b',
    });

    auth(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(false);
      value.should.have.property('message');
      value.message.should.be.eql('Invalid token');
      return done();
    });
  });
});

