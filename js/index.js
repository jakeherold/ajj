//$(function(){
  var $gasDefer = $.Deferred();


  var gas = {};
  // var gas.rawData;
  var gasAjaxRequest = $.ajax({
    type:'GET',
    url: 'http://www.fueleconomy.gov/ws/rest/fuelprices',
    success: function(data){
      gas.rawData  = xmlToJson(data);
      gas.regular  = gas.rawData.fuelPrices.regular["#text"];
      gas.midgrade = gas.rawData.fuelPrices.midgrade["#text"];
      gas.premium  = gas.rawData.fuelPrices.premium["#text"];


    }
  });

  gasAjaxRequest.done(function(){
      console.log(gas);
          console.log("regular price: "+gas.regular);
          console.log("midgrade price: "+gas.midgrade);
          console.log("premium price: "+gas.premium);

       $gasDefer.resolve();
       console.log("gasDefer resolved");

  });

$.when($gasDefer, $distanceDefer , $vehicleDefer).done(function(){
  user.mpgAvg      =  metaMpgData.avgmpg;
  user.maxMpg      = metaMpgData.maxmpg;
  user.minMpg      = metaMpgData.minmpg;
  user.gasQuantity =  (Math.round(((user.distance)/(user.mpgAvg))*100)/100);
  user.costReg     =  (Math.round(((user.gasQuantity) * (gas.regular))*100)/100);
  user.costMid     =  ((user.gasQuantity) * (gas.midgrade));
  user.costPrem    =  ((user.gasQuantity) * (gas.premium));
  console.log(user);

  $(".milesAnchor").append(user.distance);
  $(".costAnchor").append(user.costReg);
  $(".gallonsAnchor").append(user.gasQuantity);
})



//}); //ends IIFE
