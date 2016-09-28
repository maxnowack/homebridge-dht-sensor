## homebridge-dht-sensor
Homebridge plugin for DHT temperature and humidity sensors

### usage
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
