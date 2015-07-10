var assert = require('chai').assert;
var sinon = require('sinon');
var APNNotification = require('../lib/APNNotification');

var DEVICES = ['DEVICE_1', 'DEVICE_2', 'DEVICE_3'];
var NOTIFICATION = {
  title: 'TITLE',
  body: 'BODY',
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

  it('Should properly send notification', function () {
    var ios = new APNNotification({
      provider: {
        cert: 'cert.pem',
        key: 'key.pem',
        production: false
      }
    });

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios.send({
      device: DEVICES,
      notification: NOTIFICATION
    });

    assert(ios.getProvider().pushNotification.calledThrice);
    assert.equal(ios.getProvider().pushNotification.getCall(0).args[0], NOTIFICATION_SHOULD_BE);
    assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], DEVICES);

    ios.getProvider.pushNotification.restore();
  });
});
