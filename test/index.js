var assert = require('chai').assert;
var PusherService = require('../');

describe('PusherService', function () {
  it('Should properly export', function () {
    assert.isObject(PusherService);
    assert.isFunction(PusherService.create);
    assert.isFunction(PusherService.APN);
    assert.isFunction(PusherService.GCM);
  });
});
