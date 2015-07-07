var assert = require('chai').assert;
var BasePushNotification = require('../lib/BasePushNotification');

describe('BasePushNotification', function () {
  it('Should properly export', function () {
    assert.isFunction(BasePushNotification);
    assert.isFunction(BasePushNotification.prototype.getConfig);
    assert.isFunction(BasePushNotification.prototype.setConfig);
    assert.isFunction(BasePushNotification.prototype.send);

    assert.throw(function () {
      BasePushNotification.prototype.send();
    }, Error);
  });

  it('Should properly make objects configurable', function () {
    var pusher = new BasePushNotification();

    assert.notOk(pusher.getConfig('foo'));
    assert.instanceOf(pusher.setConfig('foo', 'bar'), BasePushNotification);
    assert.instanceOf(pusher.setConfig('obj', {foo: 'bar'}), BasePushNotification);
    assert.deepEqual(pusher.getConfig('obj'), {foo: 'bar'});
    assert.equal(pusher.getConfig('obj').foo, 'bar');
    assert.equal(pusher.getConfig('foo'), 'bar');
  });

  it('Should properly create pusher with pre-defined config', function () {
    var pusher = new BasePushNotification({
      foo: 'bar'
    });

    assert.equal(pusher.getConfig('foo'), 'bar');
    assert.notOk(pusher.getConfig('NOT_EXISTS'));
  });

  it('Should properly throw error on send', function () {
    var pusher = new BasePushNotification();

    assert.throw(function () {
      pusher.send();
    }, Error);
  });
});
