import createDhtSensor from './createDhtSensor'

module.exports = function register(homebridge) {
  const Service = homebridge.hap.Service
  const Characteristic = homebridge.hap.Characteristic

  homebridge.registerAccessory('homebridge-dht-sensor', 'DhtSensor', createDhtSensor({
    Service,
    Characteristic,
  }));
}
