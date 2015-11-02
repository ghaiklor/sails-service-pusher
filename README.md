# sails-service-pusher

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-pusher.svg)
![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-pusher.svg)

![Downloads](https://img.shields.io/npm/dm/sails-service-pusher.svg)
![Downloads](https://img.shields.io/npm/dt/sails-service-pusher.svg)
![npm version](https://img.shields.io/npm/v/sails-service-pusher.svg)
![License](https://img.shields.io/npm/l/sails-service-pusher.svg)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![dependencies](https://img.shields.io/david/ghaiklor/sails-service-pusher.svg)
![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-pusher.svg)

Service for Sails framework with Pusher features.

## List of supported pusher services

- APNS (Apple Push Notification Service)
- GCMS (Google Cloud Messaging Service)

## Getting Started

Install this module.

```shell
npm install sails-service-pusher
```

Then require it in your service and create pusher instance.

```javascript
// api/services/PusherService.js
import PusherService from 'sails-service-pusher';

export default PusherService('ios', {
  provider: {
    cert: 'cert.pem',
    key: 'key.pem',
    production: false
  }
});

// api/controllers/PusherController.js
export default {
  send: function(req, res) {
    PusherService
      .send(['DEVICE_TOKEN_1', 'DEVICE_TOKEN_2'], {
        title: req.param('title') || 'Pusher',
        body: req.param('body') || 'Hello from sails-service-pusher'
      })
      .then(res.ok)
      .catch(res.negotiate);
  }
};
```

## Configuration

When you instantiate new instance via `PusherService()` you can provide configuration object with 3 keys:

- `config.device` - {Array} Device tokens that should get notification (will be merged with another devices in `send()`)
- `config.provider` - {Object} Options that will go to each of SDKs ([APN](https://github.com/argon/node-apn/blob/master/doc/connection.markdown#apnconnectionoptions), [GCM](https://github.com/ToothlessGear/node-gcm#example-application))
- `config.notification` - {Object} Options that will go to each of notifications (it has one interface for each of providers, see below)

## API

Each of Pusher instances has only one method:

### send([device], [notification], [config])

Sends Push Notification.

`device` - {Array} Device tokens (registration IDs) to which push need to send (mixed up with pre-defined devices).

`notification` - {Object} Config for notification:

  - `notification.title` - Notification title
  - `notification.body` - Notification body text
  - `notification.icon` - Notification icon
  - `notification.sound` - Notification sound to be played
  - `notification.badge` - Indicates the badge on client app home icon
  - `notification.payload` - Custom data to send within Push Notification

`config` - Additional configuration for notification with specific platform. See appropriate documentation.

## Examples

### APNNotification

All of this examples contains all the configuration keys. And most of them is optional.

```javascript
let ios = PusherService('ios', {
  device: [], // Array of string with device tokens
  provider: {
    cert: 'cert.pem', // The filename of the connection certificate to load from disk
    key: 'key.pem', // The filename of the connection key to load from disk
    ca: [], // An array of trusted certificates
    pfx: '', // File path for private key, certificate and CA certs in PFX or PKCS12 format
    passphrase: '', // The passphrase for the connection key
    production: false, // Specifies which environment to connect to: Production (if true) or Sandbox
    voip: false, // Enable when you are using a VoIP certificate to enable paylods up to 4096 bytes
    port: 2195, // Gateway port
    rejectUnauthorized: true, // Reject Unauthorized property to be passed through to tls.connect()
    cacheLength: 1000, // Number of notifications to cache for error purposes
    autoAdjustCache: true, // Whether the cache should grow in response to messages being lost after errors
    maxConnections: 1, // The maximum number of connections to create for sending messages
    connectTimeout: 10000, // The duration of time the module should wait, in milliseconds
    connectionTimeout: 3600000, // The duration the socket should stay alive with no activity in milliseconds
    connectionRetryLimit: 10, // The maximum number of connection failures that will be tolerated before apn will "terminate"
    buffersNotifications: true, // Whether to buffer notifications and resend them after failure
    fastMode: false // Whether to aggresively empty the notification buffer while connected
  },
  notification: {
    title: 'iOS Test Push', // Indicates notification title
    body: 'Hey, there!', // Indicates notification body text
    icon: '', // Indicates notification icon
    sound: '', // Indicates sound to be played
    badge: '', // Indicates the badge on client app home icon
    payload: {} // Custom data to send within Push Notification
  }
});

ios
  .send(['TOKEN_1', 'TOKEN_2'], {
    body: 'You can override pre-defined'
  })
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
```

### GCMNotification

```javascript
let android = PusherService('android', {
  device: [], // Array of string with device tokens
  provider: {
    apiKey: '<GOOGLE_API_KEY>', // Your Google Server API Key
    maxSockets: 12, // Max number of sockets to have open at one time
    proxy: 'http://your-proxy.com' // This is [just like passing a proxy on to request](https://github.com/request/request#proxies)
  },
  notification: {
    title: 'Android Test Push', // Indicates notification title
    body: 'Hey, there!', // Indicates notification body text
    icon: '', // Indicates notification icon
    sound: '', // Indicates sound to be played
    badge: '', // Indicates the badge on client app home icon
    payload: {} // Custom data to send within Push Notification
  }
});

android
  .send(['TOKEN_1', 'TOKEN_2'], {
    body: 'You can override pre-defined'
  })
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
```

## License

The MIT License (MIT)

Copyright (c) 2015 Eugene Obrezkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
