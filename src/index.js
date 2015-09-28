import APNNotification from './APNNotification';
import GCMNotification from './GCMNotification';

const pusher = {
  ios: APNNotification,
  android: GCMNotification
};

/**
 * Create instance of Pusher service
 * @param {String} type
 * @param {Object} config
 * @returns {*}
 */
export default function (type, config) {
  if (pusher[type.toLowerCase()] instanceof Function) {
    return new pusher[type.toLowerCase()](config);
  } else {
    throw new Error('Unrecognized type -> ' + type);
  }
}
