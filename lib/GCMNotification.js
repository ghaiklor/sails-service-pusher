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

  var provider = this.getConfig('provider');
  this.setProvider(new gcm.Sender(provider.apiKey, provider));
}

/**
 * Create new message object
 * @param {Object} _notification Notification object
 * @param {Object} _config Additional configuration object
 * @private
 */
GCMNotification.prototype._createNotification = function (_notification, _config) {
  var predefinedConfig = this.getConfig('notification');
  var config = _.merge({}, {
    data: _notification.payload || predefinedConfig.payload,
    notification: {
      title: _notification.title || predefinedConfig.title,
      body: _notification.body || predefinedConfig.body,
      icon: _notification.icon || predefinedConfig.icon,
      sound: _notification.sound || predefinedConfig.sound,
      badge: _notification.badge || predefinedConfig.badge
    }
  }, _config);

  return new gcm.Message(config);
};

/**
 * Send notification to device
 * @param {Array|String} _device Array with device tokens or string with token
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
  var device = _device || [];
  var message = this._createNotification(_notification, _config);

  return new Promise(function (resolve, reject) {
    this.getProvider().send(message, device, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = GCMNotification;
