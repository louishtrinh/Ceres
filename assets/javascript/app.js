function weather() {
  var weatherURL = "http://api.openweathermap.org/data/2.5/weather?id=5392171&APPID=2a69d1f4ce8a367d123d72948f006681";
 
  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    var temp = ((response.main.temp-273.15)*1.8)+32;
    temp = temp.toFixed(0);
    console.log(temp);
    $("#weatherTemp").text("The temp is " + temp + "ºF")
    var weatherCondition = ((response.weather[0].description))
    console.log(weatherCondition);
    $("#weatherCond").text("The condition you can expect is: " + weatherCondition);    
  });
 }
 
 weather();

var timezoneURL = "https://maps.googleapis.com/maps/api/timezone/json?location=37.3382,-121.8863&timestamp=1331161200&key=AIzaSyDA5pE6-JI4kSdYhzTn3qyAMzLYs_zITD8";

$.ajax({
  url: timezoneURL,
  method: "GET"
}).then(function (response) {
  console.log(response);

  function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (1000 * offset));

    $("#time").append("Your local time is : " + nd.toLocaleString());
  }

  calcTime(-28800.0);
});

