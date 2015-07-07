var APNPushNotification = require('./APNNotification');
var GCMPushNotification = require('./GCMNotification');

module.exports = {
  create: function (type, options) {
    switch (type) {
      case 'ios':
        return new APNPushNotification(options);
      case 'android':
        return new GCMPushNotification(options);
      default:
        throw new Error('Unrecognized type');
    }
  },

  APN: APNPushNotification,
  GCM: GCMPushNotification
};
