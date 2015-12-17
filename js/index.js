//$(function(){
  // var $gasDefer = $.Deferred();


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
          console.log("regular price: "+gas.regular);
          console.log("midgrade price: "+gas.midgrade);
          console.log("premium price: "+gas.premium);

       // $gasDefer.resolve();

  });

// $.when($gasDefer, $distanceDefer /*  , $vehicleDefer*/).done(function(){
//   user.mpg         =  "x";
//   user.gasQuantity =  ((user.distance)/(user.mpg));
//   user.costReg     =  ((user.gasQuantity) * (gas.regular));
//   user.costMid     =  ((user.gasQuantity) * (gas.midgrade));
//   user.costPrem    =  ((user.gasQuantity) * (gas.premium));
//   console.log(user);
// })

//}); //ends IIFE
