var userIP, lat, long;
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
    converse("#temperature");
    converse("#tomorrow1Min");
    converse("#tomorrow1Max");
    converse("#tomorrow2Min");
    converse("#tomorrow2Max");
    converse("#tomorrow3Min");
    converse("#tomorrow3Max");

    if (isCelsius)
      $("#convert").html("&#8457");
    if (!isCelsius)
      $("#convert").html("&#8451");
    isCelsius = !isCelsius;

    // trick to simulate fadeIn
    $(".fadeIn").each(function(){
      // pure JS code because each selected object is NOT jquery object
      var copy = this.cloneNode(true);
      this.parentNode.replaceChild(copy, this);
    })
  })

  // deal with dates
  $("#today").text(weekDays[(d.getDay()) % 7]);
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
  $("#temperature").html(data.currently.temperature.toFixed(0));
  $("#convert").html("&#8457"); // make sure proper label

  //set icons
  var iconToday = data.currently.icon;
  var iconTomorrow1 = data.daily.data[1].icon;
  var iconTomorrow2 = data.daily.data[2].icon;
  var iconTomorrow3 = data.daily.data[3].icon;
  skycons.set("iconToday", iconToday);
  skycons.set("iconTomorrow1", iconTomorrow1);
  skycons.set("iconTomorrow2", iconTomorrow2);
  skycons.set("iconTomorrow3", iconTomorrow3);
  skycons.play();

  // draw tempRange
  tempRange(data);
}

function converse(element) {
  var temp = Number($(element).text());

  if (!isCelsius) {
    temp = ((temp - 32) * 5/9).toFixed(0);
    $(element).html(temp);
  } else {
    temp = (temp * 9/5 +32).toFixed(0);
    $(element).html(temp);
  }
}
