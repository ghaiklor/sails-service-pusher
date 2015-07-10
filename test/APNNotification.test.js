var assert = require('chai').assert;
var sinon = require('sinon');
var APNNotification = require('../lib/APNNotification');

var DEVICES = ['a1', 'b2', 'c3'];
var NOTIFICATION = {
  title: 'TITLE',
  icon: 'ICON',
  sound: 'SOUND',
  badge: 'BADGE',
  payload: {
    foo: 'bar',
    bar: 'foo'
  }
};

var NOTIFICATION_SHOULD_BE = {
  aps: {
    alert: {
      title: 'TITLE',
      body: 'BODY'
    },
    sound: 'SOUND',
    badge: 'BADGE'
  },
  payload: {
    foo: 'bar',
    bar: 'foo'
  }
};

describe('APNNotification', function () {
  it('Should properly export', function () {
    assert.isFunction(APNNotification);
  });

  it('Should properly send notification to multiple devices', function () {
    var ios = new APNNotification({
      provider: {
        cert: 'cert.pem',
        key: 'key.pem',
        production: false
      },
      notification: {
        body: 'BODY'
      }
    });

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios.send({
      device: DEVICES,
      notification: NOTIFICATION
    });

    assert(ios.getProvider().pushNotification.calledThrice);
    assert.deepEqual(ios.getProvider().pushNotification.getCall(0).args[0].payload, NOTIFICATION_SHOULD_BE);
    assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');
    assert.equal(ios.getProvider().pushNotification.getCall(1).args[1], 'b2');
    assert.equal(ios.getProvider().pushNotification.getCall(2).args[1], 'c3');

    ios.getProvider().pushNotification.restore();
  });

  it('Should properly send notification to one device', function () {
    var ios = new APNNotification({
      provider: {
        cert: 'cert.pem',
        key: 'key.pem',
        production: false
      },
      notification: {
        body: 'BODY'
      }
    });

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios.send({
      device: 'a1',
      notification: NOTIFICATION
    });

    assert(ios.getProvider().pushNotification.calledOnce);
    assert.deepEqual(ios.getProvider().pushNotification.getCall(0).args[0].payload, NOTIFICATION_SHOULD_BE);
    assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');

    ios.getProvider().pushNotification.restore();
  });
});
