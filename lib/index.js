var APNNotification = require('./APNNotification');
var GCMNotification = require('./GCMNotification');

module.exports = {
  create: function (type, options) {
    switch (type) {
      case 'ios':
        return new APNNotification(options);
      case 'android':
        return new GCMNotification(options);
      default:
        throw new Error('Unrecognized type');
    }
  },

  APNNotification: APNNotification,
  GCMNotification: GCMNotification
};
