const { connectDB } = require('../../index');
const chai = require('chai');
chai.should();

const { updateName } = require('../../services/index');
const user = require('../User');
const call = request => ({
  request,
});

describe('#updateName()', () => {
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

  it('Update name', done => {
    const request = call({
      token: user.token,
      name: 'updatedName1',
    });

    updateName(request, (err, value) => {
      if (err) return done();
      value.should.be.an('object');
      value.should.have.property('success');
      value.success.should.be.eql(true);
      value.should.have.property('message');
      value.message.should.be.eql('Name has been updated');
      user.name = 'updatedName1';
      return done();
    });
  });

  it('Update with wrong token', done => {
    const request = call({
      token: '6e443b5ed1fc18416b87ba1b',
      name: 'updatedName1',
    });

    updateName(request, (err, value) => {
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
