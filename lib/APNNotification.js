var apn = require('apn');
var _ = require('lodash');
var Promise = require('bluebird');
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

  this.setProvider(new apn.Connection(this.get('provider')));

  this
    .getProvider()
    .on('error', this.get('stderr') || DEFAULT_STDERR)
    .on('transmissionError', this.get('stderr') || DEFAULT_STDERR);
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
 * @param {Object} _notification Configuration for the notification
 * @param {Object} _config Additional configuration for the notification object
 * @returns {Notification}
 * @private
 */
APNNotification.prototype._createNotification = function (_notification, _config) {
  var predefinedNotification = this.get('notification') || {};
  var customNotification = _notification || {};
  var notification = new apn.Notification({
    aps: {
      alert: {
        title: customNotification.title || predefinedNotification.title || '',
        body: customNotification.body || predefinedNotification.body || ''
      },
      sound: customNotification.sound || predefinedNotification.sound || '',
      badge: customNotification.badge || predefinedNotification.badge || ''
    },
    payload: customNotification.payload || predefinedNotification.payload || {}
  });

  return _.assign(notification, _config);
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
 * @param {Array} [_device] Device tokens in array of string or string
 * @param {Object} [_notification] Notification configuration
 * @param {Object} [_config] Additional configuration for notification
 * @returns {APNNotification}
 * @example
 * APNNotification.send(['DEVICE'], {
 *  title: 'Notification title',
 *  body: 'Notification body text',
 *  icon: 'Drawable resource',
 *  sound: 'Sound to be played',
 *  badge: 'The badge on client app',
 *  payload: {}
 * });
 */
APNNotification.prototype.send = function (_device, _notification, _config) {
  var device = [].concat(this.get('device') || []).concat(_device || []);
  var notification = this._createNotification(_notification, _config);

  for (var i = 0; i < device.length; i++) {
    this._sendToDevice(this._createDevice(device[i]), notification);
  }

  return Promise.resolve();
};

module.exports = APNNotification;
