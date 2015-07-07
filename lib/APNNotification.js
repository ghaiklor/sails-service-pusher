var apn = require('apn');
var util = require('util');
var BasePushNotification = require('./BaseNotification');

util.inherits(APNPushNotification, BasePushNotification);

/**
 * Create new APN Push Notification
 * @param {Object} options
 * @returns {APNPushNotification}
 * @constructor
 */
function APNPushNotification(options) {
  BasePushNotification.apply(this, arguments);

  this.setProvider(new apn.Connection({
    cert: '',
    key: ''
  }));
}

/**
 * Create device instance
 * @param {Object} config
 * @returns {*}
 * @private
 */
APNPushNotification.prototype._createDevice = function (config) {
  return new apn.Device(config);
};

/**
 * Create notification instance
 * @param {Object} config
 * @returns {*}
 * @private
 */
APNPushNotification.prototype._createNotification = function (config) {
  return new apn.Notification(config);
};

/**
 * Send push notification to device
 * @returns {APNPushNotification}
 */
APNPushNotification.prototype.send = function () {
  this
    .getProvider()
    .pushNotification(this._createNotification(this.getConfig('notification')), this._createDevice(this.getConfig('device')));

  return this;
};

module.exports = APNPushNotification;
