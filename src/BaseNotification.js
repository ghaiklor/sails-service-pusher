import _ from 'lodash';

export default class BaseNotification {
  constructor(_config) {
    this._config = {};
    this._provider = {};

    _.assign(this._config, _config);
  }

  /**
   * Get configuration value
   * @param {String} [path]
   * @returns {*}
   */
  get(path) {
    return typeof path === 'undefined' ? this._config : _.get(this._config, path);
  }

  /**
   * Set configuration value
   * @param {String} path
   * @param {*} value
   * @returns {BaseNotification}
   */
  set(path, value) {
    _.set(this._config, path, value);
    return this;
  }

  /**
   * Get provider for sending notifications
   * @returns {*}
   */
  getProvider() {
    return this._provider;
  }

  /**
   * Set new provider to this pusher
   * @param {*} provider
   * @returns {BaseNotification}
   */
  setProvider(provider) {
    this._provider = provider;
    return this;
  }
}
