$(function(){

  var gas = {};
  // var gas.rawData;
  $.ajax({
    type:'GET',
    url: 'http://www.fueleconomy.gov/ws/rest/fuelprices',
    success: function(data){
      console.log(data);
      gas.rawData = xmlToJson(data);
      console.log(gas.rawData);
    }
  });

  // var gas.regular = gas.rawData.fuelPrices.midgrade;
  // console.log(gas.regular);
  // var gas.midgrade;
  // var gas.premium;

}); //ends IIFE
