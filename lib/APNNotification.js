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

  this.setProvider(new apn.Connection(this.getConfig('connection')));
}

/**
 * Create device instance
 * @param {String} token Device token
 * @returns {*}
 * @private
 */
APNNotification.prototype._createDevice = function (token) {
  return new apn.Device(token);
};

/**
 * Create notification instance
 * @param {Object} config
 * @returns {*}
 * @private
 */
APNNotification.prototype._createNotification = function (config) {
  return new apn.Notification(config);
};

/**
 * Send push notification to device
 * @returns {APNNotification}
 */
APNNotification.prototype.send = function () {
  var device = this._createDevice(this.getConfig('device'));
  var notification = this._createNotification(this.getConfig('notification'));

  this.getProvider().pushNotification(notification, device);

  return this;
};

module.exports = APNNotification;
