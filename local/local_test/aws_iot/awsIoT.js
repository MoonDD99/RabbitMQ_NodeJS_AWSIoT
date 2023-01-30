const awsIoT = require('aws-iot-device-sdk');
const { json } = require('express');
var awsIoTConfig = require('../config/awsIoTConfig.json');
var rabbitMQApi = require('../config/rabbitMQConfig.json');

// awsIoT Device 객세 생성 eps32_air
const device = awsIoT.device({
  keyPath: awsIoTConfig.keyPath,
  certPath: awsIoTConfig.certPath,
  caPath: awsIoTConfig.caPath,
  clientId: awsIoTConfig.clientId,
  host: awsIoTConfig.host,
  keepalive: 10    // AWS IoT supports kepp-alive values between 5 and 1200
});

// mqtt connect
device.on('connect', (connack) => {
  console.log(connack);
  device.subscribe(rabbitMQApi.topic);
});

// message 수신 event
device.on('message', (topic, payload) => {
	console.log('message', topic, payload.toString());
})

// close event
device.on('close', (err) => err && console.log(err));

// reconnect event
device.on('reconnect', () => { });

// offline event
device.on('offline', () => { });

// error event
device.on('error', (error) => error && console.log(error));

function publishTopic(id, status){
  const topic = rabbitMQApi.topic + `${id}`
  const message = {
    "message": "LED",
    "id": id,
    "status": status
  }
  device.publish(topic, JSON.stringify(message));
}; 

module.exports = {publishTopic};