import sensorLib from 'node-dht-sensor'

export default function createDhtSensor({ Service, Characteristic }) {
  return class DhtSensor {
    constructor(log, config) {
      this.log = log
      this.name = config.name
      this.type = config.sensorType
      this.pin = config.gpioPin

      this.humidityService = new Service.HumiditySensor(this.name)
      this.temperatureService = new Service.TemperatureSensor(this.name)

      this.humidityService
        .getCharacteristic(Characteristic.CurrentRelativeHumidity)
        .on('get', this.getValue.bind(this, 'humidity'))

      this.temperatureService
        .getCharacteristic(Characteristic.CurrentTemperature)
        .on('get', this.getValue.bind(this, 'temperature'))
    }

    getValue(what, callback) {
      const result = sensorLib.readSpec(this.type, this.pin)
      const error = result.humidity === 0 && result.temperature === 0
        ? new Error('cannot get sensor data')
        : null

      callback(error, result[what])
    }

    getServices() {
      return [this.humidityService, this.temperatureService]
    }
  }
}
