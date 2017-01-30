## homebridge-dht-sensor
Homebridge plugin for DHT temperature and humidity sensors

## installation
``` bash
$ npm install -g homebridge-dht-sensor
```

## usage
This module depends on the [BCM2835](http://www.airspayce.com/mikem/bcm2835/) library that must be installed on your board before you can actually use this module.

You have to specify the `sensorType` (11 for DHT11; 22 for DHT22 or AM2302) and the `gpioPin` to which the data pin of the sensor is connected.

````json
{
  "bridge": {
    "name": "Homebridge",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },

  "accessories": [{
    "accessory": "DhtSensor",
    "name": "Sensor",
    "sensorType": 22,
    "gpioPin": 17
  }],

  "platforms": []
}
````
