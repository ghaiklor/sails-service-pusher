# sails-service-pusher

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-pusher.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-pusher.svg) ![Downloads](https://img.shields.io/npm/dm/sails-service-pusher.svg) ![npm version](https://img.shields.io/npm/v/sails-service-pusher.svg) ![dependencies](https://img.shields.io/david/ghaiklor/sails-service-pusher.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-pusher.svg) ![License](https://img.shields.io/npm/l/sails-service-pusher.svg)

Service for Sails framework with Pusher features.

## List of supported pusher services

- APN (Apple Push Notification)
- GCM (Google Cloud Messaging)
- MPNS (Microsoft Push Notification Service)

## Getting Started

Install this module.

```shell
npm install sails-service-pusher
```

Then require it in your service.

```javascript
// api/services/PusherService.js
module.exports = require('sails-service-pusher');
```

That's it, you can create pusher instances for your needs in your project.

```javascript
// api/controllers/PusherController.js
var ios = PusherService.create('ios', {
  connection: {
    cert: 'cert.pem',
    key: 'cert.key'
  }
});

module.exports = {
  send: function(req, res) {
    ios
      .send({
        device: '<DEVICE_TOKEN>',
        notification: {
          text: '<SOME_TEXT>'
        }
      })
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

## API

Each of Payment instances has only one method:

- send(config) - Send Push Notification. In config you can override pre-defined configuration. Returns Promise;

## Examples

### APNNotification

var ios = PusherService.create('ios', {

});

### GCMNotification

var android = PusherService.create('android', {

});

### MPNSNotification

var windows = PusherService.create('windows', {

});

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
