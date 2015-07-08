var assert = require('chai').assert;
var BaseNotification = require('../lib/BaseNotification');

describe('BaseNotification', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseNotification);
    assert.isFunction(BaseNotification.prototype.getConfig);
    assert.isFunction(BaseNotification.prototype.setConfig);
    assert.isFunction(BaseNotification.prototype.getProvider);
    assert.isFunction(BaseNotification.prototype.setProvider);
    assert.isFunction(BaseNotification.prototype.send);

    assert.throw(function () {
      BaseNotification.prototype.send();
    }, Error);
  });

  it('Should properly make objects configurable', function () {
    var pusher = new BaseNotification();

    assert.notOk(pusher.getConfig('foo'));
    assert.instanceOf(pusher.setConfig('foo', 'bar'), BaseNotification);
    assert.instanceOf(pusher.setConfig('obj', {foo: 'bar'}), BaseNotification);
    assert.deepEqual(pusher.getConfig('obj'), {foo: 'bar'});
    assert.equal(pusher.getConfig('obj').foo, 'bar');
    assert.equal(pusher.getConfig('foo'), 'bar');
  });

  it('Should properly create pusher with pre-defined config', function () {
    var pusher = new BaseNotification({
      foo: 'bar'
    });

    assert.equal(pusher.getConfig('foo'), 'bar');
    assert.notOk(pusher.getConfig('NOT_EXISTS'));
  });

  it('Should properly get/set provider', function () {
    var pusher = new BaseNotification();

    assert.notOk(pusher.getProvider());
    assert.instanceOf(pusher.setProvider('SOME_PROVIDER'), BaseNotification);
    assert.equal(pusher.getProvider(), 'SOME_PROVIDER');
  });

  it('Should properly throw error on send', function () {
    var pusher = new BaseNotification();

    assert.throw(function () {
      pusher.send();
    }, Error);
  });
});
