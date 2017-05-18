function tempRange(data) {
  console.log(data);
  var tomorrow1Min = data.daily.data[1].apparentTemperatureMin;
  var tomorrow1Max = data.daily.data[1].apparentTemperatureMax;
  var tomorrow2Min = data.daily.data[2].apparentTemperatureMin;
  var tomorrow2Max = data.daily.data[2].apparentTemperatureMax;
  var tomorrow3Min = data.daily.data[3].apparentTemperatureMin;
  var tomorrow3Max = data.daily.data[3].apparentTemperatureMax;

  var absMin = Math.min(tomorrow1Min, tomorrow2Min, tomorrow3Min);
  var absMax = Math.max(tomorrow1Max, tomorrow2Max, tomorrow3Max);

  var tempRange = absMax - absMin;
  console.log("tempRange: " + tempRange);

  var tomorrow1Bar = (((tomorrow1Max - tomorrow1Min) / tempRange) * 100).toFixed(0);
  var tomorrow2Bar = (((tomorrow2Max - tomorrow2Min) / tempRange) * 100).toFixed(0);
  var tomorrow3Bar = (((tomorrow3Max - tomorrow3Min) / tempRange) * 100).toFixed(0);
  console.log("tomorrow1Bar: " + tomorrow1Bar);
  console.log("tomorrow2Bar: " + tomorrow2Bar);
  console.log("tomorrow3Bar: " + tomorrow3Bar);


  var tomorrow1Left = (((tomorrow1Min - absMin) / tempRange) * 100).toFixed(0);
  var tomorrow2Left = (((tomorrow2Min - absMin) / tempRange) * 100).toFixed(0);
  var tomorrow3Left = (((tomorrow3Min - absMin) / tempRange) * 100).toFixed(0);
  console.log("tomorrow1Left: " + tomorrow1Left);
  console.log("tomorrow2Left: " + tomorrow2Left);
  console.log("tomorrow3Left: " + tomorrow3Left);


  var tomorrow1Right = (((absMax - tomorrow1Max) / tempRange) * 100).toFixed(0);
  var tomorrow2Right = (((absMax - tomorrow2Max) / tempRange) * 100).toFixed(0);
  var tomorrow3Right = (((absMax - tomorrow3Max) / tempRange) * 100).toFixed(0);
  console.log("tomorrow1Right: " + tomorrow1Right);
  console.log("tomorrow2Right: " + tomorrow2Right);
  console.log("tomorrow3Right: " + tomorrow3Right);

  // returns
  $("#tomorrow1-left").css("width", tomorrow1Left + "%");
  $("#tomorrow1-bar").css("width", tomorrow1Bar + "%");
  $("#tomorrow1-right").css("width", tomorrow1Right + "%");

  $("#tomorrow2-left").css("width", tomorrow2Left + "%");
  $("#tomorrow2-bar").css("width", tomorrow2Bar + "%");
  $("#tomorrow2-right").css("width", tomorrow2Right + "%");

  $("#tomorrow3-left").css("width", tomorrow3Left + "%");
  $("#tomorrow3-bar").css("width", tomorrow3Bar + "%");
  $("#tomorrow3-right").css("width", tomorrow3Right + "%");
}
