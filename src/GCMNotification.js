import _ from 'lodash';
import gcm from 'node-gcm';
import BaseNotification from './BaseNotification';

export default class GCMNotification extends BaseNotification {
  constructor(...args) {
    super(...args);

    this.setProvider(new gcm.Sender(this.get('provider.apiKey'), this.get('provider')));
  }

  /**
   * Create new message object
   * @param {Object} [_notification] Notification object
   * @param {Object} [_config] Additional configuration object
   * @private
   */
  createNotification(_notification, _config) {
    let predefinedNotification = this.get('notification') || {};
    let notification = _notification || {};
    let config = _.merge({
      data: notification.payload || predefinedNotification.payload || {},
      notification: {
        title: notification.title || predefinedNotification.title,
        body: notification.body || predefinedNotification.body,
        icon: notification.icon || predefinedNotification.icon,
        sound: notification.sound || predefinedNotification.sound,
        badge: notification.badge || predefinedNotification.badge
      }
    }, _config);

    return new gcm.Message(config);
  }

  /**
   * Send notification to device
   * @param {Array} [_device] Array with device tokens or string with token
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
  send(_device, _notification, _config) {
    let device = [].concat(this.get('device') || []).concat(_device || []);
    let message = this.createNotification(_notification, _config);

    return new Promise((resolve, reject) => {
      this.getProvider().send(message, device, (error, result) => error ? reject(error) : resolve(result));
    });
  }
}
