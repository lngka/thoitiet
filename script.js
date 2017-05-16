//addfe35e11125032026cd9c162143a15
var userIP, lat, long, isCelsius;
var skycons = new Skycons({"color": "black"});

var list  = [
      "clear-day", "clear-night", "partly-cloudy-day",
      "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
      "fog"
    ];

$(document).ready(function(){

  // get user IP
  $.ajax({
    url: "https://freegeoip.net/json/?callback=parseIP",
    dataType: "JSONP",
    type: "GET",
    jsonpCallback: "parseIP"
  })
})

function parseIP(data) {
  // update Location
  $("#location").html(data.city + " " + data.region_name + ", " +data.country_name);

  // get lat long
  lat = data.latitude;
  long = data.longitude;

  // call DarkSky
  $.ajax({
    url: "https://api.darksky.net/forecast/addfe35e11125032026cd9c162143a15/" +lat +"," +long,
    dataType: "JSONP",
    type: "GET",
    jsonpCallback: "parseWeather"
  })
}

function parseWeather(data) {
  // update temperature
  $("#temperature").html(data.currently.temperature);

  // get icon
  icon = data.currently.icon;

  //set icon
  skycons.set("icon", icon);
  skycons.play();
}
