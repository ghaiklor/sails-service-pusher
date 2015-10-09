# Changelog

## 3.1.0

- Bump dependencies;

## 3.0.1

- General improvements;

## 3.0.0

- Migration from ES5 to ES6 syntax;
- Remove `.create()` method from PusherService. PusherService is a function itself that you can call `PusherService('android')`;
- Update dependencies and pin them in `package.json`;

## 2.0.1

- Fix: Bug with invalid parameters in Google Cloud Messaging;

## 2.0.0

- Replace `getConfig` and `setConfig` with appropriate `get` and `set` methods;
- Refactor each of `APNNotification` and `GCMNotification`;
- Optimize `create` method in `PusherService`;
- Improve test coverage;
- Update docs;

## 1.0.0

- Add support for Apple Push Notification Service;
- Add support for Google Cloud Messaging;

## 0.1.0

- Initial release;
