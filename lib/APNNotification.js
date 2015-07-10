var apn = require('apn');
var _ = require('lodash');
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
 * Create apn device with specified token
 * @param {String} token Device token
 * @returns {apn.Device}
 * @private
 */
APNNotification.prototype._createDevice = function (token) {
  return new apn.Device(token);
};

/**
 * Create apn notification
 * @param {Object} config Configuration for the notification
 * @returns {*}
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
  return new apn.Notification(_.assign({}, {
    aps: {
      alert: {
        title: config.title,
        body: config.body
      },
      sound: config.sound,
      badge: config.badge
    },
    payload: config.payload
  }, config));
};

/**
 * Send push notification to device
 * @param {Object} [_config]
 * @returns {APNNotification}
 */
APNNotification.prototype.send = function (_config) {
  var config = _.omit(_.assign({}, this.getConfig(), _config), 'provider');
  var device = this._createDevice(config.device);
  var notification = this._createNotification(config.notification);

  this.getProvider().pushNotification(notification, device);

  return this;
};

module.exports = APNNotification;
