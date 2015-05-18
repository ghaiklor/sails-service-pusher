var apn = require('apn');
var util = require('util');
var BasePushNotification = require('./BasePushNotification');
connection = new apn.Connection({
  cert: '',
  key: ''
}).on('error', console.log.bind(console.log)).on('transmissionError', console.log.bind(console.log));

util.inherits(APNPushNotification, BasePushNotification);

/**
 * Create new APN Push Notification
 * @param {Object} options
 * @returns {APNPushNotification}
 * @constructor
 */
function APNPushNotification(options) {
  BasePushNotification.apply(this, arguments);

  options = extend(true, {}, {
    device: '',
    notification: {
      aps: {
        alert: "\uD83D\uDCE7 \u2709 You have a new message",
        sound: 'ping.aiff',
        badge: 1
      },
      payload: {}
    }
  }, options);

  this.device = new apn.Device(options.device);
  this.notification = new apn.Notification(options.notification);
}

/**
 * Send push notification to device
 * @returns {APNPushNotification}
 */
APNPushNotification.prototype.send = function () {
  connection.pushNotification(this.notification, this.device);
  return this;
};

module.exports = APNPushNotification;
