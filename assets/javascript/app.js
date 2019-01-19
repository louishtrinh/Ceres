
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('select');
  //   var instances = M.FormSelect.init(elems, options);
  // });

  // Or with jQuery

  
         
$(document).ready(function(){
  $("select").formSelect();
});


      

function weather() {
  var weatherURL = "https://api.openweathermap.org/data/2.5/weather?id=5392171&APPID=2a69d1f4ce8a367d123d72948f006681";

  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function (response) {
/*     console.log(response)
 */    var temp = ((response.main.temp-273.15)*1.8)+32;
    temp = temp.toFixed(1);
/*     console.log(temp);
 */
    var weatherCondition = ((response.weather[0].description))
/*     console.log(weatherCondition);
 */    
    $("#weatherTemp").append("Temperature: " + temp + "ºF");
    $("#weatherCond").append("Outdoor condition: " + weatherCondition);
  });
}
weather();

var timezoneURL = "https://maps.googleapis.com/maps/api/timezone/json?location=37.3382,-121.8863&timestamp=1331161200&key=AIzaSyDA5pE6-JI4kSdYhzTn3qyAMzLYs_zITD8";

$.ajax({
  url: timezoneURL,
  method: "GET"
}).then(function (response) {
/*   console.log(response);
 */
//calculating from 1/1/1970 UTC

  function calcTime(offset) {
    var d = new Date(); // to get user computer time
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000); // to get the seconds diff between time now and UTC
    var nd = new Date(utc + (1000 * offset)); //rawoffset = -28800

    $("#time").append("Date: " + nd.toLocaleString().replace(/,/, ' & Local Time: '));
  }

  calcTime(-28800.0);
});

var database = firebase.database();




// 3. Create Firebase event for adding new information to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
/*     console.log(childSnapshot.val());
 */
    // Store everything into a variable.
    var address = childSnapshot.val().address;
    var fruitType = childSnapshot.val().fruitType;
    var propertyType = childSnapshot.val().propertyType;


  
    // input Info
/*     console.log(address);
    console.log(fruitType);
    console.log(propertyType); */


     // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(fruitType),
    $("<td>").text(propertyType),
    $("<td>").text(address)
  
  );

//   Append the new row to the table
  $("#foraging-table > tbody").append(newRow);
});


