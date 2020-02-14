const { connectDB } = require('../../index');
const chai = require('chai');
chai.should();

const { signIn } = require('../../services/index');
const user = require('../User');
const call = request => ({
  request,
});

describe('#signIn()', () => {
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

  it('User signin', done => {
    const request = call(user.getAll());

    signIn(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(true);
      value.should.have.property('token');
      user.token = value.token;
      return done();
    });
  });

  it('User signin with wrong credentials', done => {
    const request = call({
      email: 'email1@gmail.com',
      password: '2',
    });

    signIn(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(false);
      value.should.have.property('message');
      value.message.should.be.eql('Invalid credentials');
      return done();
    });
  });

  it('User does not exist', done => {
    const request = call({
      email: 'email2@gmail.com',
      password: '2',
    });

    signIn(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(false);
      value.should.have.property('message');
      value.message.should.be.eql('Invalid credentials');
      return done();
    });
  });

  it('Empty fields', done => {
    const request = call({
      email: 'email2@gmail.com',
      password: '2',
    });
    signIn(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(false);
      value.should.have.property('message');
      value.message.should.be.eql('Invalid credentials');
      return done();
    });
  });
});
