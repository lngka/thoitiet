//addfe35e11125032026cd9c162143a15
var userIP;
var lat;
var long;
var skycons = new Skycons({"color": "black"});
skycons.set("icon", Skycons.RAIN);
skycons.play();

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
}
