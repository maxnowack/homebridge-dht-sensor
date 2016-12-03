import sensorLib from 'node-dht-sensor'

export default function createDhtSensor({ Service, Characteristic }) {
  return class DhtSensor {
    constructor(log, config) {
      this.log = log
      this.name = config.name
      this.type = config.sensorType
      this.pin = config.gpioPin
      this.cacheTimeout = config.cacheTimeout || (60 * 1000) // 1 minute

      this.temperature = 0
      this.humidity = 0
      this.lastUpdate = null

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
      sensorLib.read(this.type, this.pin, (err, temperature = 0, humidity = 0) => {
        if (!err && humidity !== 0 && temperature !== 0) {
          this.humidity = humidity
          this.temperature = temperature
          this.lastUpdate = Date.now()
        }

        if (Date.now() - this.lastUpdate >= this.cacheTimeout) {
          return callback(new Error('cannot get sensor data'), null)
        }

        switch (what) {
          case 'temperature': return callback(null, this.temperature)
          case 'humidity': return callback(null, this.humidity)
          default: return callback(null, { humidity: this.humidity, temperature: this.temperature })
        }
      })
    }

    getServices() {
      return [this.humidityService, this.temperatureService]
    }
  }
}
