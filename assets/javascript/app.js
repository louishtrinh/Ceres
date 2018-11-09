var weatherURL = "http://api.openweathermap.org/data/2.5/weather?id=5392171&APPID=2a69d1f4ce8a367d123d72948f006681";

$.ajax({
  url: weatherURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
});

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

var database = firebase.database();



// 3. Create Firebase event for adding new information to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var address = childSnapshot.val().address;
    var fruitType = childSnapshot.val().fruitType;
    var propertyType = childSnapshot.val().propertyType;


  
    // input Info
    console.log(address);
    console.log(fruitType);
    console.log(propertyType);


     // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(address),
    $("<td>").text(fruitType),
    $("<td>").text(propertyType)
  
  );

//   Append the new row to the table
  $("#foraging-table > tbody").append(newRow);
});