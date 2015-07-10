var apn = require('apn');
var _ = require('lodash');
var util = require('util');
var BaseNotification = require('./BaseNotification');

/**
 * Default stderr
 * @type {Function}
 */
var DEFAULT_STDERR = console.error.bind(console);

util.inherits(APNNotification, BaseNotification);

/**
 * Create new APN service
 * @returns {APNNotification}
 * @constructor
 */
function APNNotification() {
  BaseNotification.apply(this, arguments);

  this.setProvider(new apn.Connection(this.getConfig('provider')));

  this
    .getProvider()
    .on('error', this.getConfig('stderr') || DEFAULT_STDERR)
    .on('socketError', this.getConfig('stderr') || DEFAULT_STDERR)
    .on('transmissionError', this.getConfig('stderr') || DEFAULT_STDERR);
}

/**
 * Create apn device with specified token
 * @param {String} token Device token
 * @returns {Device}
 * @private
 */
APNNotification.prototype._createDevice = function (token) {
  return new apn.Device(token);
};

/**
 * Create apn notification
 * @param {Object} config Configuration for the notification
 * @returns {Notification}
 * @private
 * @example
 * APNNotification._createNotification({
 *  title: 'Notification title',
 *  body: 'Notification body text',
 *  icon: 'Drawable resource',
 *  sound: 'Sound to be played',
 *  badge: 'The badge on client app',
 *  payload: {}
 * });
 */
APNNotification.prototype._createNotification = function (config) {
  return new apn.Notification({
    aps: {
      alert: {
        title: config.title,
        body: config.body
      },
      sound: config.sound,
      badge: config.badge
    },
    payload: config.payload
  });
};

/**
 * Send push notification for one of devices
 * @param {Device} device Device object
 * @param {Notification} notification Notification object
 * @returns {APNNotification}
 * @private
 */
APNNotification.prototype._sendToDevice = function (device, notification) {
  this.getProvider().pushNotification(notification, device);
  return this;
};

/**
 * Send push notification to devices
 * @param {Object} [_config]
 * @returns {APNNotification}
 */
APNNotification.prototype.send = function (_config) {
  var config = _.omit(_.assign({}, this.getConfig(), _config), 'provider');
  var notification = this._createNotification(config.notification);

  if (config.device instanceof Array) {
    for (var i = 0; i < config.device.length; i++) {
      this._sendToDevice(this._createDevice(config.device[i]), notification);
    }
  } else {
    this._sendToDevice(this._createDevice(config.device), notification);
  }
};

module.exports = APNNotification;
