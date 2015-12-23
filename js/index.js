//$(function(){
  var $gasDefer = $.Deferred();
  var $printDataDefer = $.Deferred();

  var gas = {};
  // var gas.rawData;
  var gasAjaxRequest = $.ajax({
    type:'GET',
    url: 'https://www.fueleconomy.gov/ws/rest/fuelprices',
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
  buildUserObject();
  console.log("build user fired");
  $printDataDefer.resolve();
  console.log("print data resolved fired");

  // $chartOne = $.Deferred();
  // $chartTwo = $.Deferred();

    $.when($printDataDefer).done(function(){
      console.log("printing Cost, distance, and gallons to DOM");
      printCostDistAndGas(); //Show miles traveled, total trip cost, and gallons of gas used in the DOM
      console.log("print cost dist and gas fired");

      var costChart = costChartTrigger();//Prints chart using nv.d3
      console.log("Cost chart trigger fired");
      console.log(costChart);
      var mpgChart = mpgChartTrigger();//Prints chart using nv.d3
      console.log("mpg chart fired");
      console.log(mpgChart);

      //});
    });
  });


function printCostDistAndGas (){
  // $(".milesAnchor").html("");
  // $(".milesAnchor").append(user.distance);
  $(".costAnchor").html("");
  $(".costAnchor").append("Cost = $" + user.costReg);
  $(".gallonsAnchor").html("");
  $(".gallonsAnchor").append("Gallons = " + user.gasQuantityAvg);
}
function buildUserObject (){
  user.avgMpg      =  metaMpgData.avgmpg;
  user.maxMpg      = metaMpgData.maxmpg;
  user.minMpg      = metaMpgData.minmpg;
  // user.vehicleID   = metaMpgData
  user.gasQuantityAvg = (Math.round(((user.distance)/(user.avgMpg))*100)/100);
  user.gasQuantityMax = (Math.round(((user.distance)/(user.minMpg))*100)/100);
  user.gasQuantityMin = (Math.round(((user.distance)/(user.maxMpg))*100)/100);
  user.costReg     =  (Math.round(((user.gasQuantityAvg) * (gas.regular))*100)/100);
  user.costMid     =  ((user.gasQuantityAvg) * (gas.midgrade));
  user.costPrem    =  ((user.gasQuantityAvg) * (gas.premium));
  console.log(user);
}


//}); //ends IIFE
