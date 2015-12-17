$(function(){

  var gas = {};
  // var gas.rawData;
  $.ajax({
    type:'GET',
    url: 'http://www.fueleconomy.gov/ws/rest/fuelprices',
    success: function(data){
      console.log(data);
      gas.rawData = xmlToJson(data);

    gas.regular = gas.rawData.fuelPrices.regular["#text"];
    console.log(gas.regular);
    gas.midgrade = gas.rawData.fuelPrices.midgrade["#text"];
    console.log(gas.midgrade);
    gas.premium = gas.rawData.fuelPrices.premium["#text"];
    console.log(gas.premium);

    }
  });





}); //ends IIFE
