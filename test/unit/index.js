import { assert } from 'chai';
import PusherService from '../../src/index';
import APNNotification from '../../src/APNNotification';
import GCMNotification from '../../src/GCMNotification';

describe('PusherService', () => {
  it('Should properly export', () => {
    assert.isFunction(PusherService);
  });

  it('Should properly create ios instance', () => {
    assert.instanceOf(PusherService('ios'), APNNotification);
  });

  it('Should properly create android instance', () => {
    assert.instanceOf(PusherService('android'), GCMNotification);
  });

  it('Should properly throw exception on create unrecognized', () => {
    assert.throw(() => PusherService('NOT_EXISTS'), Error);
  });
});
