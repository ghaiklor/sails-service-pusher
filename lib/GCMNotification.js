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
}

/**
 * Send notification to device
 * @param {Object} [config] You can override pre-defined configuration here
 * @returns {Promise}
 */
GCMNotification.prototype.send = function (config) {

  return new Promise(function (resolve, reject) {
    this.sender.send(this.message, [], 4, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = GCMNotification;
