var assert = require('chai').assert;
var GCMNotification = require('../lib/GCMNotification');

describe('GCMNotification', function () {
  it('Should properly export', function () {
    assert.isFunction(GCMNotification);
  });
});
