var assert = require('chai').assert;
var sinon = require('sinon');
var APNNotification = require('../lib/APNNotification');

var CONFIG = {
  device: ['a1'],
  provider: {
    cert: 'cert.pem',
    key: 'key.pem',
    production: false
  },
  notification: {
    title: 'TITLE',
    body: 'BODY',
    icon: 'ICON',
    sound: 'SOUND',
    badge: 'BADGE',
    payload: {
      foo: 'bar',
      bar: 'foo'
    }
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

  it('Should properly send notification with pre-defined options', function (done) {
    var ios = new APNNotification(CONFIG);

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios
      .send(['b2', 'c3'])
      .then(function () {
        assert.ok(ios.getProvider().pushNotification.calledThrice);
        assert.deepEqual(ios.getProvider().pushNotification.getCall(0).args[0].payload, NOTIFICATION_SHOULD_BE);
        assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');
        assert.equal(ios.getProvider().pushNotification.getCall(1).args[1], 'b2');
        assert.equal(ios.getProvider().pushNotification.getCall(2).args[1], 'c3');

        ios.getProvider().pushNotification.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with custom notification', function (done) {
    var ios = new APNNotification(CONFIG);

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios
      .send(['b2', 'c3'], {
        body: 'OVERRIDE_BODY'
      })
      .then(function () {
        assert.ok(ios.getProvider().pushNotification.calledThrice);
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'payload.aps.alert.body', 'OVERRIDE_BODY');
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'payload.aps.sound', 'SOUND');
        assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');
        assert.equal(ios.getProvider().pushNotification.getCall(1).args[1], 'b2');
        assert.equal(ios.getProvider().pushNotification.getCall(2).args[1], 'c3');

        ios.getProvider().pushNotification.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with extended notification', function (done) {
    var ios = new APNNotification(CONFIG);

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios
      .send(['b2'], {
        body: 'OVERRIDE_BODY'
      }, {
        priority: 5
      })
      .then(function () {
        assert.ok(ios.getProvider().pushNotification.calledTwice);
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'payload.aps.alert.body', 'OVERRIDE_BODY');
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'priority', 5);
        assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');
        assert.equal(ios.getProvider().pushNotification.getCall(1).args[1], 'b2');

        ios.getProvider().pushNotification.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with all empty config', function (done) {
    var ios = new APNNotification();
    sinon.stub(ios.getProvider(), 'pushNotification');

    ios
      .send()
      .then(function () {
        assert.ok(ios.getProvider().pushNotification.notCalled);
        ios.getProvider().pushNotification.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with empty pre-defined config and empty notification', function (done) {
    var ios = new APNNotification();

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios
      .send(['a1'])
      .then(function () {
        assert.ok(ios.getProvider().pushNotification.calledOnce);
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'payload.aps.alert.title', '');
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'payload.aps.alert.body', '');
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'priority', 10);
        assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');

        ios.getProvider().pushNotification.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with empty pre-defined config and custom notification', function (done) {
    var ios = new APNNotification();

    sinon.stub(ios.getProvider(), 'pushNotification');

    ios
      .send(['a1'], {
        title: 'CUSTOM_TITLE',
        body: 'CUSTOM_BODY'
      }, {
        priority: 5
      })
      .then(function () {
        assert.ok(ios.getProvider().pushNotification.calledOnce);
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'payload.aps.alert.title', 'CUSTOM_TITLE');
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'payload.aps.alert.body', 'CUSTOM_BODY');
        assert.deepPropertyVal(ios.getProvider().pushNotification.getCall(0).args[0], 'priority', 5);
        assert.equal(ios.getProvider().pushNotification.getCall(0).args[1], 'a1');

        ios.getProvider().pushNotification.restore();

        done();
      })
      .catch(done);
  });
});
