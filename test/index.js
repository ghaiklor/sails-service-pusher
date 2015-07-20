var assert = require('chai').assert;
var PusherService = require('../');
var APNNotification = PusherService.APNNotification;
var GCMNotification = PusherService.GCMNotification;

describe('PusherService', function () {
  it('Should properly export', function () {
    assert.isObject(PusherService);
    assert.isFunction(PusherService.create);
    assert.isFunction(PusherService.APNNotification);
    assert.isFunction(PusherService.GCMNotification);
  });

  it('Should properly create ios instance', function () {
    assert.instanceOf(PusherService.create('ios'), APNNotification);
  });

  it('Should properly create android instance', function () {
    assert.instanceOf(PusherService.create('android'), GCMNotification);
  });

  it('Should properly throw exception on create unrecognized', function () {
    assert.throw(function () {
      PusherService.create('NOT_EXISTS');
    }, Error);
  });
});
