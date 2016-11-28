// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
        url: 'https://api.wunderground.com/api/1fc15dbff84b202c/geolookup/conditions/q/' + lat + ',' + long + '.json',
            dataType: "jsonp",
            success: function (data) {
                var location = data['location']['city'];
                var state = data['location']['state'];
                $('#cityDisplay').html(location + ', ' + state);
                $('title').html(location + ', ' + state + " | Weather Home");
                var temp = data['current_observation']['temp_f'];
                $('#currentTemp').html(Math.round(temp)+"&#176;F");
                var weath = data['current_observation']['weather'];
                $('#add1').html("Current weather: " + weath);
                var wind = data['current_observation']['wind_mph'];
                $('#add2').html("Wind Speed: " + wind + "mph");
                console.log(data);
            }
  });
      $("#cover").fadeOut(250);
    }
           });


  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };