'use strict';
describe('Thermostat', function(){
var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  describe('Temperature control', function(){
    it('starts at 20 degrees', function(){
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });

    it('increases in temperature with the up button', function(){
      thermostat.up();
      expect(thermostat.getCurrentTemperature()).toEqual(21);
    });

    it('decreases in temperature with the down button', function(){
      thermostat.down();
      expect(thermostat.getCurrentTemperature()).toEqual(19);
    });

    it('has a minimum temperature of 10 degrees', function(){
      for( var i = 0; i <11; i++){
        thermostat.down();
      };
      expect(thermostat.getCurrentTemperature()).toEqual(10);
    });
    it ('temperature can be reset to 20', function(){
      thermostat.down();
      thermostat.resetTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(20);
    });
  });

  describe('Power saving mode', function(){
    it ('power saving mode is on by default', function(){
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it ('can switch PSM off', function(){
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
    });

    it ('can switch PSM on', function(){
      thermostat.switchPowerSavingModeOff();
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it ('has a maximum temperature of 25 degrees when power saving is on', function(){
      for( var i = 0; i <6; i++){
        thermostat.up();
      };
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });
  });

  describe ('Displaying energy usage levels', function(){
    it ('shows low energy when temperature is below 18 degrees', function(){
      for( var i = 0; i < 3; i++){
        thermostat.down();
      };
      expect(thermostat.EnergyUsage()).toEqual('low-usage');
    });
    it ('shows medium energy when temperature is between 18 and 25 degrees (inclusive)', function(){
      expect(thermostat.EnergyUsage()).toEqual('medium-usage');
    });
    it ('shows high energy when temperature is above 25 degrees', function(){
      thermostat.switchPowerSavingModeOff();
      for( var i = 0; i<6; i++){
        thermostat.up();
      };
      expect(thermostat.EnergyUsage()).toEqual('high-usage');
    });
  });
});
