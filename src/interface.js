'use strict';
var thermostat;

$( document ).ready(function() {

  function displayWeather(city){
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=bcebb95329f7ace43020439afcb4e214';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp) +"C";
    });
  }

  $('#select-city').submit(function(event){
    event.preventDefault();
    var city = $("#current-city").val();
    displayWeather(city);
    $.post("http://localhost:4567/city", {city: city});
  });

  function updateTemperature(){
    $('#temperature').text(thermostat.temperature) + "˚C";
    $('#temperature').attr('class', thermostat.EnergyUsage());
    $.post("http://localhost:4567/temperature", {temp: thermostat.temperature});
  }

  thermostat = new Thermostat();
    $.getJSON("http://localhost:4567/data", function(data){
      console.log(data);
      thermostat.temperature = data.temp;
      $('#temperature').text(thermostat.temperature) + "˚C";
      $('#temperature').attr('class', thermostat.EnergyUsage());

      if (data.psmode === "true") {
        thermostat.switchPowerSavingModeOn();
        $('#power-saving-status').text('ON');
        $('#power-saving-status').attr('class', thermostat.PowerSaving());
      } else {
        thermostat.switchPowerSavingModeOff();
        $('#power-saving-status').text('OFF');
        $('#power-saving-status').attr('class', thermostat.PowerSaving());
      }

      $("#current-city").val(data.city);
      displayWeather(data.city);
    });

  $('#temp-up').on('click', function(){
    thermostat.up();
    updateTemperature();
  });

  $('#temp-down').click(function(){
    thermostat.down();
    updateTemperature();
  });

  $('#temp-reset').click(function(){
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('#power-saving-on').click(function(){
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('ON');
    $('#power-saving-status').attr('class', thermostat.PowerSaving());
    $.post("http://localhost:4567/powersaving", {psmode: thermostat.isPowerSavingModeOn()});
  });

  $('#power-saving-off').click(function(){
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('OFF');
    $('#power-saving-status').attr('class', thermostat.PowerSaving());
    $.post("http://localhost:4567/powersaving", {psmode: thermostat.isPowerSavingModeOn()});
  });

});
