var _ = require('lodash');

/**
 * Create base instance for push notifications
 * @param {Object} [_config]
 * @constructor
 */
function BaseNotification(_config) {
  this._config = {};

  _.forOwn(_config, function (value, key) {
    this.set(key, value);
  }.bind(this));
}

/**
 * Get configuration value
 * @param {String} [path]
 * @returns {*}
 */
BaseNotification.prototype.get = function (path) {
  return typeof path === 'undefined' ? this._config : _.get(this._config, path);
};

/**
 * Set configuration value
 * @param {String} path
 * @param {*} value
 * @returns {BaseNotification}
 */
BaseNotification.prototype.set = function (path, value) {
  _.set(this._config, path, value);
  return this;
};

/**
 * Get provider for sending notifications
 * @returns {*}
 */
BaseNotification.prototype.getProvider = function () {
  return this._provider;
};

/**
 * Set new provider to this pusher
 * @param {*} provider
 * @returns {BaseNotification}
 */
BaseNotification.prototype.setProvider = function (provider) {
  this._provider = provider;
  return this;
};

BaseNotification.prototype.send = _;

module.exports = BaseNotification;
