var pushers = {
  ios: require('./APNNotification'),
  android: require('./GCMNotification')
};

module.exports = {
  /**
   * Create instance of Pusher service
   * @param {String} type
   * @param {Object} config
   * @returns {*}
   */
  create: function (type, config) {
    if (pushers[type.toLowerCase()] instanceof Function) {
      return new pushers[type.toLowerCase()](config);
    } else {
      throw new Error('Unrecognized type');
    }
  },

  APNNotification: pushers.ios,
  GCMNotification: pushers.android
};
