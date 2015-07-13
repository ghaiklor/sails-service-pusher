var assert = require('chai').assert;
var sinon = require('sinon');
var APNNotification = require('../lib/APNNotification');

var PROVIDER_CONFIG = {
  provider: {
    cert: 'cert.pem',
    key: 'key.pem',
    production: false
  },
  notification: {
    title: 'TITLE',
    badge: 1
  }
};

var DEVICES_LIST = ['a1', 'b2', 'c3'];
var NOTIFICATION_SHOULD_BE = {
  aps: {
    alert: {
      title: 'TITLE',
      body: 'BODY'
    },
    badge: 1
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
    var ios = new APNNotification(PROVIDER_CONFIG);

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios.send(DEVICES_LIST, {
      body: 'BODY',
      payload: {
        foo: 'bar',
        bar: 'foo'
      }
    });

    assert(ios.getProvider().pushNotification.calledThrice);
    assert.deepEqual(ios.getProvider().pushNotification.getCall(0).args[0].payload, NOTIFICATION_SHOULD_BE);
    assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');
    assert.equal(ios.getProvider().pushNotification.getCall(1).args[1], 'b2');
    assert.equal(ios.getProvider().pushNotification.getCall(2).args[1], 'c3');

    ios.getProvider().pushNotification.restore();
  });

  it('Should properly send notification to one device', function () {
    var ios = new APNNotification(PROVIDER_CONFIG);

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios.send('a1', {
      body: 'BODY',
      payload: {
        foo: 'bar',
        bar: 'foo'
      }
    });

    assert(ios.getProvider().pushNotification.calledOnce);
    assert.deepEqual(ios.getProvider().pushNotification.getCall(0).args[0].payload, NOTIFICATION_SHOULD_BE);
    assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');

    ios.getProvider().pushNotification.restore();
  });
});
