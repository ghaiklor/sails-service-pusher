var assert = require('chai').assert;
var APNNotification = require('../lib/APNNotification');

describe('APNNotification', function () {
  it('Should properly export', function () {
    assert.isFunction(APNNotification);
  });
});
