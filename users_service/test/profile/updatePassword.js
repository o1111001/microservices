const { connectDB } = require('../../index');
const chai = require('chai');
chai.should();

const { updatePassword } = require('../../services/index');
const user = require('../User');
const call = request => ({
  request,
});

describe('#updatePassword()', () => {
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

  it('Update password', done => {
    const request = call({
      token: user.token,
      password: 'updatedPass1',
    });
    updatePassword(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(true);
      value.should.have.property('message');
      value.message.should.be.eql('Password has been updated');
      user.password = 'updatedPass1';
      return done();
    });
  });

  it('Update with wrong token', done => {
    const request = call({
      token: '6e443b5ed1fc18416b87ba1b',
      name: 'updatedPass1',
    });

    updatePassword(request, (err, value) => {
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
