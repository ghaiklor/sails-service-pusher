var apn = require('apn');
var extend = require('extend');
var util = require('util');
var BaseNotification = require('./BaseNotification');

util.inherits(APNNotification, BaseNotification);

/**
 * Create new APN service
 * @returns {APNNotification}
 * @constructor
 */
function APNNotification() {
  BaseNotification.apply(this, arguments);

  this.setProvider(new apn.Connection(this.getConfig('provider')));
}

/**
 * Send push notification to device
 * @param {Object} [_config]
 * @returns {APNNotification}
 */
APNNotification.prototype.send = function (_config) {
  var config = extend({}, this.getConfig(), _config);
  var device = new apn.Device(config.device);
  var notification = new apn.Notification(config.notification);

  this.getProvider().pushNotification(notification, device);

  return this;
};

module.exports = APNNotification;
