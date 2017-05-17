//addfe35e11125032026cd9c162143a15
var userIP, lat, long, fTemp;
var isCelsius = false;
var skycons = new Skycons({"color": "black"});

// var list  = [
//       "clear-day", "clear-night", "partly-cloudy-day",
//       "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
//       "fog"
//     ];

$(document).ready(function(){

  // get user IP
  $.ajax({
    url: "https://freegeoip.net/json/?callback=parseIP",
    dataType: "JSONP",
    type: "GET",
    jsonpCallback: "parseIP"
  })

  // convert C <-> F
  $("#convert").on("click", function(){

    if (isCelsius) {
      $("#temperature").html(fTemp);
      $("#convert").html("&#8457");
      isCelsius = !isCelsius;

    } else if(!isCelsius) { // if Farenheit and cTemp uncalculated
      var cTemp = ((fTemp - 32) * 5/9).toFixed(2);
      $("#temperature").html(cTemp);
      $("#convert").html("&#8451");
      isCelsius = !isCelsius;
    }
  })
})

/*
* callback function to process data from freegeoip
*/
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

/*
* callback function to process data from DarkSky API
*/
function parseWeather(data) {

  // update temperature
  // remembers fTemp for converstion to cTemp
  fTemp = data.currently.temperature;
  $("#temperature").html(fTemp);
  $("#convert").html("&#8457"); // if user changed #convert to "C" before reponse from DarkSky, make sure proper label

  // get icon
  icon = data.currently.icon;

  //set icon
  skycons.set("icon", icon);
  skycons.play();

  console.log(data);
}
