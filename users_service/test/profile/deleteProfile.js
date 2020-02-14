const { connectDB } = require('../../index');
const chai = require('chai');
chai.should();

const { deleteProfile, signIn } = require('../../services/index');
const user = require('../User');
const call = request => ({
  request,
});

describe('#deleteProfile()', () => {
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

  it('Delete profile', done => {
    const request = call({
      token: user.token,
    });

    deleteProfile(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(true);
      value.should.have.property('message');
      value.message.should.be.eql('Profile has been deleted');
      return done();
    });
  });

  it('Check signin', done => {
    const request = call(user.getAll());
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
