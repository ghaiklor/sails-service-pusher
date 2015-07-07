var util = require('util');
var gcm = require('gcm');
var BaseNotification = require('./BaseNotification');

util.inherits(GCMPushNotification, BaseNotification);

/**
 * Create new push notification to Android devices
 * @param {Object} options
 * @constructor
 */
function GCMPushNotification(options) {
  BaseNotification.apply(this, arguments);

  options = extend(true, {}, {
    devices: [],
    message: {
      collapseKey: 'demo',
      delayWhileIdle: true,
      timeToLive: 3,
      data: {
        hitch: 'test'
      }
    }
  }, options);

  this.devices = options.devices;

  this.sender = new gcm.Sender();
  this.message = new gcm.Message(options.message);
}

/**
 * Send notification to device
 */
GCMPushNotification.prototype.send = function () {
  return new Promise(function (resolve, reject) {
    this.sender.send(this.message, [], 4, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = GCMPushNotification;
