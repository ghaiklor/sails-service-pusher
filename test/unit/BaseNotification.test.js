import { assert } from 'chai';
import BaseNotification from '../../src/BaseNotification';

describe('BaseNotification', () => {
  it('Should properly export', () => {
    assert.isFunction(BaseNotification);
  });

  it('Should properly make objects configurable', () => {
    let notification = new BaseNotification();

    assert.notOk(notification.get('foo'));
    assert.instanceOf(notification.set('foo', 'bar'), BaseNotification);
    assert.instanceOf(notification.set('obj', {foo: 'bar'}), BaseNotification);
    assert.deepEqual(notification.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.deepEqual(notification.get('obj'), {foo: 'bar'});
    assert.equal(notification.get('obj.foo'), 'bar');
    assert.equal(notification.get('foo'), 'bar');
  });

  it('Should properly create notification with pre-defined config', () => {
    let notification = new BaseNotification({
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

  it('Should properly get/set provider', () => {
    let notification = new BaseNotification();

    assert.notOk(notification.getProvider());
    assert.instanceOf(notification.setProvider('NOTIFICATION'), BaseNotification);
    assert.equal(notification.getProvider(), 'NOTIFICATION');
  });
});
