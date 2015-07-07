var mpns = require('mpns');
var util = require('util');
var BaseNotification = require('./BaseNotification');

util.inherits(MPNSNotification, BaseNotification);

function MPNSNotification() {

}

module.exports = MPNSNotification;
