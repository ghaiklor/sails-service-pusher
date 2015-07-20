var assert = require('chai').assert;
var BaseNotification = require('../lib/BaseNotification');

describe('BaseNotification', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseNotification);
    assert.isFunction(BaseNotification.prototype.get);
    assert.isFunction(BaseNotification.prototype.set);
    assert.isFunction(BaseNotification.prototype.getProvider);
    assert.isFunction(BaseNotification.prototype.setProvider);
    assert.isFunction(BaseNotification.prototype.send);
  });

  it('Should properly make objects configurable', function () {
    var notification = new BaseNotification();

    assert.notOk(notification.get('foo'));
    assert.instanceOf(notification.set('foo', 'bar'), BaseNotification);
    assert.instanceOf(notification.set('obj', {foo: 'bar'}), BaseNotification);
    assert.deepEqual(notification.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.deepEqual(notification.get('obj'), {foo: 'bar'});
    assert.equal(notification.get('obj.foo'), 'bar');
    assert.equal(notification.get('foo'), 'bar');
  });

  it('Should properly create notification with pre-defined config', function () {
    var notification = new BaseNotification({
      foo: 'bar',
      obj: {
        foo: 'bar'
      }
    });

    assert.equal(notification.get('foo'), 'bar');
    assert.equal(notification.get('obj.foo'), 'bar');
    assert.deepEqual(notification.get('obj'), {foo: 'bar'});
    assert.notOk(notification.get('NOT_EXISTS'));
  });

  it('Should properly get/set provider', function () {
    var notification = new BaseNotification();

    assert.notOk(notification.getProvider());
    assert.instanceOf(notification.setProvider('NOTIFICATION'), BaseNotification);
    assert.equal(notification.getProvider(), 'NOTIFICATION');
  });
});
