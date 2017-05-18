var userIP, lat, long, fTemp;
var isCelsius = false;
var skycons = new Skycons({"color": "black"});
var d = new Date();
var weekDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}

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

    } else if(!isCelsius) {
      var cTemp = ((fTemp - 32) * 5/9).toFixed(2);
      $("#temperature").html(cTemp);
      $("#convert").html("&#8451");
      isCelsius = !isCelsius;
    }
  })

  // deal with dates
  $("#today").text(weekDays[(d.getDay()) % 7]);
    console.log(d.getDay());
  $("#tomorrow1").text(weekDays[(d.getDay()+1) % 7]);
  $("#tomorrow2").text(weekDays[(d.getDay()+2) % 7]);
  $("#tomorrow3").text(weekDays[(d.getDay()+3) % 7]);
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
  $("#convert").html("&#8457"); // make sure proper label

  //set icon
  var iconToday = data.currently.icon;
  skycons.set("iconToday", iconToday);

  skycons.play();

}

/*
*  possible weather status
var list  = [
      "clear-day", "clear-night", "partly-cloudy-day",
      "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
      "fog"
    ];
*/
