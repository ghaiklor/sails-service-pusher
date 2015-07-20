var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
var gcm = require('node-gcm');
var BaseNotification = require('./BaseNotification');

util.inherits(GCMNotification, BaseNotification);

/**
 * Create new push notification to Android devices
 * @param {Object} options
 * @constructor
 */
function GCMNotification(options) {
  BaseNotification.apply(this, arguments);

  var provider = this.get('provider') || {};
  this.setProvider(new gcm.Sender(provider.apiKey, _.omit(provider, 'apiKey')));
}

/**
 * Create new message object
 * @param {Object} [_notification] Notification object
 * @param {Object} [_config] Additional configuration object
 * @private
 */
GCMNotification.prototype._createNotification = function (_notification, _config) {
  var predefinedNotification = this.get('notification') || {};
  var notification = _notification || {};
  var config = _.merge({
    data: notification.payload || predefinedNotification.payload || {},
    notification: {
      title: notification.title || predefinedNotification.title || '',
      body: notification.body || predefinedNotification.body || '',
      icon: notification.icon || predefinedNotification.icon || '',
      sound: notification.sound || predefinedNotification.sound || '',
      badge: notification.badge || predefinedNotification.badge || ''
    }
  }, _config);

  return new gcm.Message(config);
};

/**
 * Send notification to device
 * @param {Array} [_device] Array with device tokens or string with token
 * @param {Object} [_notification] Notification configuration object
 * @param {Object} [_config] Additional configuration for notification
 * @returns {Promise}
 * APNNotification.send('DEVICE', {
 *  title: 'Notification title',
 *  body: 'Notification body text',
 *  icon: 'Drawable resource',
 *  sound: 'Sound to be played',
 *  badge: 'The badge on client app',
 *  payload: {}
 * });
 */
GCMNotification.prototype.send = function (_device, _notification, _config) {
  var device = [].concat(this.get('device') || []).concat(_device || []);
  var message = this._createNotification(_notification, _config);

  return new Promise(function (resolve, reject) {
    this.getProvider().send(message, device, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = GCMNotification;
