    var queryURL = "http://api.openweathermap.org/data/2.5/weather?id=5392171&APPID=2a69d1f4ce8a367d123d72948f006681";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });