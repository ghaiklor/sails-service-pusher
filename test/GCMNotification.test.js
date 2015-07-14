var assert = require('chai').assert;
var sinon = require('sinon');
var GCMNotification = require('../lib/GCMNotification');

var PROVIDER_CONFIG = {
  provider: {
    apiKey: 'test'
  },
  notification: {
    title: 'TITLE',
    icon: 'ICON',
    badge: 1
  }
};

var DEVICES_LIST = ['a1', 'b2', 'c3'];
var NOTIFICATION_SHOULD_BE = {
  notification: {
    title: 'TITLE',
    icon: 'ICON',
    body: 'BODY',
    badge: 1
  },
  data: {
    foo: 'bar',
    bar: 'foo'
  }
};

describe('GCMNotification', function () {
  it('Should properly export', function () {
    assert.isFunction(GCMNotification);
  });

  it('Should properly send notification to multiple devices', function () {
    var android = new GCMNotification(PROVIDER_CONFIG);

    sinon.stub(android.getProvider(), 'send');

    android.send(DEVICES_LIST, {
      body: 'BODY',
      payload: {
        foo: 'bar',
        bar: 'foo'
      }
    });

    assert(android.getProvider().send.calledOnce);
    assert.deepEqual(android.getProvider().send.getCall(0).args[0], NOTIFICATION_SHOULD_BE);
    assert.equal(android.getProvider().send.getCall(0).args[1], DEVICES_LIST);

    android.getProvider().send.restore();
  });

  it('Should properly send notification to one device', function () {
    var android = new GCMNotification(PROVIDER_CONFIG);

    sinon.stub(android.getProvider(), 'send');

    android.send('a1', {
      body: 'BODY',
      payload: {
        foo: 'bar',
        bar: 'foo'
      }
    });

    assert(android.getProvider().send.calledOnce);
    assert.deepEqual(android.getProvider().send.getCall(0).args[0].payload, NOTIFICATION_SHOULD_BE);
    assert.equal(android.getProvider().send.getCall(0).args[1], 'a1');

    android.getProvider().send.restore();
  });
});
