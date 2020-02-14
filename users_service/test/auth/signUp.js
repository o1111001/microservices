const mongoose = require('mongoose');
const { connectDB } = require('../../index');
const chai = require('chai');
chai.should();

const { signUp } = require('../../services/index');
const user = require('../User');
const call = request => ({
  request,
});

describe('#signUp()', () => {
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

  before(done => {
    mongoose.connection.db.dropCollection('users', (err, value) => {
      if (err || !value) {
        console.log('users collection has not been deleted');
        return done();
      }
      console.log('users collection has been deleted');
      return done();
    });
  });

  before(done => {
    mongoose.connection.db.dropCollection('usersessions', (err, value) => {
      if (err || !value) {
        console.log('usersessions collection has not been deleted');
        return done();
      }
      console.log('usersessions collection has been deleted');
      return done();
    });
  });


  it('User signup', done => {
    const request = call(user.getAll());

    signUp(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(true);
      value.should.have.property('message');
      value.message.should.be.eql('User saved');
      return done();
    });
  });

  it('User already exists', done => {
    const request = call({
      email: 'email1@gmail.com',
      password: '1',
      name: 'name1',
      role: 'user',
    });

    signUp(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(false);
      value.should.have.property('message');
      value.message.should.be.eql('User already exists');
      return done();

    });
  });

  it('Empty fields', done => {
    const request = call({});

    signUp(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(false);
      value.should.have.property('message');
      value.message.should.be.eql('Fieds are empty');
      return done();
    });
  });
});

module.exports = {
  user,
};
