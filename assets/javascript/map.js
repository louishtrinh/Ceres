database = firebase.database();

map = {
  stNum: "",
  stName: "",
  city: "",
  state: "",
  fruit: "",
  property: "",
  comment: "",
  lat: 0,
  long: 0,
  fullAddress: "",
  latLong: [],
  api: "&key=AIzaSyB22oBue48oqdkA7xqVGxoS0XYwj1UgOKI",
  fillAddress: function() {
    queryURL =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      map.latLong +
      map.api;
    console.log("HTML5 Geolocation detecting address from:");
    console.log(queryURL);
    console.log("-----------");

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("Location Info:");
      console.log(response);
      console.log(response.results[0].address_components[0].long_name);
      console.log(response.results[0].address_components[1].long_name);
      console.log(response.results[0].address_components[2].long_name);
      console.log(response.results[0].address_components[5].short_name);
      console.log("-----------");

      $("#stNum-input").val(
        response.results[0].address_components[0].long_name
      );
      $("#stName-input").val(
        response.results[0].address_components[1].long_name
      );
      $("#city-input").val(response.results[0].address_components[3].long_name);
      $("#state-input").val(
        response.results[0].address_components[5].short_name
      );
    });
  },
  pushToFireBase: function() {
    queryURL =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      map.stNum +
      "+" +
      map.stName.replace(" ", "+") +
      "+" +
      map.city.replace(" ", "+") +
      "+" +
      map.state +
      "+" +
      map.api;

    console.log("Pulling LongLat for Firebase from:");
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("lat and Long");
      map.lat = response.results[0].geometry.location.lat;
      map.long = response.results[0].geometry.location.lng;
      console.log(map.lat);
      console.log(map.long);

      database.ref().push({
        address: map.fullAddress,
        propertyType: map.property,
        fruitType: map.fruit,
        comment: map.comment,
        lat: map.lat,
        long: map.long
      });
    });
  }
};

/* HTML5 Geolocation */
function showPosition(position) {
  map.latLong = position.coords.latitude + "," + position.coords.longitude;
  map.fillAddress();
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    return "Unknown";
  }
}
/* HTML5 Geolocation */

$("#detectBtn").on("click", function() {
  getLocation();
});

$("#addBtn").on("click", function(event) {
  event.preventDefault();

  map.stNum = $("#stNum-input")
    .val()
    .trim();
  map.stName = $("#stName-input")
    .val()
    .trim();
  map.city = $("#city-input")
    .val()
    .trim();
  map.state = $("#state-input")
    .val()
    .trim();
  map.fruit = $("#fruit-input")
    .val()
    .trim();
  map.property = $("#property-input")
    .val()
    .trim();
  map.comment = $("#comment-input")
    .val()
    .trim();

  $("#stNum-input").val("");
  $("#stName-input").val("");
  $("#city-input").val("");
  $("#state-input").val("");
  $("#fruit-input").val("");
  $("#comment-input").val("");

  map.fullAddress =
    map.stNum + " " + map.stName + ", " + map.city + ", " + map.state;

  console.log(map.fullAddress);
  console.log(map.property);
  console.log(map.fruit);
  console.log(map.comment);

  map.pushToFireBase();
});
