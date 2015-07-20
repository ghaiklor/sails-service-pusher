var assert = require('chai').assert;
var sinon = require('sinon');
var GCMNotification = require('../lib/GCMNotification');

var CONFIG = {
  device: ['a1'],
  provider: {
    apiKey: 'test'
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
  notification: {
    title: 'TITLE',
    body: 'BODY',
    icon: 'ICON',
    sound: 'SOUND',
    badge: 'BADGE'
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

  it('Should properly send notification with pre-defined options', function (done) {
    var android = new GCMNotification(CONFIG);

    sinon.stub(android.getProvider(), 'send', function (message, devices, cb) {
      cb(null, 'RESULT');
    });

    android
      .send(['b2', 'c3'])
      .then(function (result) {
        assert.equal(result, 'RESULT');
        assert(android.getProvider().send.calledOnce);
        assert.deepEqual(android.getProvider().send.getCall(0).args[0].params, NOTIFICATION_SHOULD_BE);
        assert.deepEqual(android.getProvider().send.getCall(0).args[1], ['a1', 'b2', 'c3']);
        assert.isFunction(android.getProvider().send.getCall(0).args[2]);

        android.getProvider().send.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with custom notification', function (done) {
    var android = new GCMNotification(CONFIG);

    sinon.stub(android.getProvider(), 'send', function (message, device, cb) {
      cb(null, 'RESULT');
    });

    android
      .send(['b2', 'c3'], {
        body: 'OVERRIDE_BODY'
      })
      .then(function (result) {
        assert.equal(result, 'RESULT');
        assert(android.getProvider().send.calledOnce);
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.body', 'OVERRIDE_BODY');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.title', 'TITLE');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.data.foo', 'bar');
        assert.deepEqual(android.getProvider().send.getCall(0).args[1], ['a1', 'b2', 'c3']);
        assert.isFunction(android.getProvider().send.getCall(0).args[2]);

        android.getProvider().send.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with extended notification', function (done) {
    var android = new GCMNotification(CONFIG);

    sinon.stub(android.getProvider(), 'send', function (message, device, cb) {
      cb(null, 'RESULT');
    });

    android
      .send(['b2'], {
        body: 'OVERRIDE_BODY'
      }, {
        dryRun: true
      })
      .then(function (result) {
        assert.equal(result, 'RESULT');
        assert.ok(android.getProvider().send.calledOnce);
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.body', 'OVERRIDE_BODY');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.title', 'TITLE');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.dryRun', true);
        assert.deepEqual(android.getProvider().send.getCall(0).args[1], ['a1', 'b2']);
        assert.isFunction(android.getProvider().send.getCall(0).args[2]);

        android.getProvider().send.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with all empty config', function (done) {
    var android = new GCMNotification();

    sinon.stub(android.getProvider(), 'send', function (message, device, cb) {
      cb(null, 'RESULT');
    });

    android
      .send()
      .then(function (result) {
        assert.equal(result, 'RESULT');
        assert.ok(android.getProvider().send.calledOnce);
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.body', '');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.title', '');
        assert.deepEqual(android.getProvider().send.getCall(0).args[1], []);
        assert.isFunction(android.getProvider().send.getCall(0).args[2]);

        android.getProvider().send.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with empty pre-defined config and empty notification', function (done) {
    var android = new GCMNotification();

    sinon.stub(android.getProvider(), 'send', function (message, device, cb) {
      cb(null, 'RESULT');
    });

    android
      .send(['a1'])
      .then(function (result) {
        assert.equal(result, 'RESULT');
        assert.ok(android.getProvider().send.calledOnce);
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.body', '');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.title', '');
        assert.deepEqual(android.getProvider().send.getCall(0).args[1], ['a1']);
        assert.isFunction(android.getProvider().send.getCall(0).args[2]);

        android.getProvider().send.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send notification with empty pre-defined config and custom notification', function (done) {
    var android = new GCMNotification();

    sinon.stub(android.getProvider(), 'send', function (message, device, cb) {
      cb(null, 'RESULT');
    });

    android
      .send(['a1'], {
        title: 'CUSTOM_TITLE',
        body: 'CUSTOM_BODY'
      }, {
        dryRun: true
      })
      .then(function (result) {
        assert.equal(result, 'RESULT');
        assert.ok(android.getProvider().send.calledOnce);
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.title', 'CUSTOM_TITLE');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.body', 'CUSTOM_BODY');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.dryRun', true);
        assert.deepEqual(android.getProvider().send.getCall(0).args[1], ['a1']);
        assert.isFunction(android.getProvider().send.getCall(0).args[2]);

        android.getProvider().send.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly reject promise on send notification', function (done) {
    var android = new GCMNotification();

    sinon.stub(android.getProvider(), 'send', function (message, device, cb) {
      cb(new Error('Some error occurred'));
    });

    android
      .send(['a1'], {
        title: 'CUSTOM_TITLE',
        body: 'CUSTOM_BODY'
      }, {
        dryRun: true
      })
      .then(done)
      .catch(function (error) {
        assert.instanceOf(error, Error);
        assert.ok(android.getProvider().send.calledOnce);
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.title', 'CUSTOM_TITLE');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.notification.body', 'CUSTOM_BODY');
        assert.deepPropertyVal(android.getProvider().send.getCall(0).args[0], 'params.dryRun', true);
        assert.deepEqual(android.getProvider().send.getCall(0).args[1], ['a1']);
        assert.isFunction(android.getProvider().send.getCall(0).args[2]);

        android.getProvider().send.restore();

        done();
      });
  });
});
