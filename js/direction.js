var waypts = [];
var user = {};
var $distanceDefer = $.Deferred();
var $vehicleDefer = $.Deferred();
var vehicleID;
var vehicleRequest = vehicleRequest||{};
// var $resultDefer = $.Deferred();
// var $googleDefer = $.Deferred();
$('#submitWP').on('click', addWayPoint);
$('#clearMidPoint').on('click', removeWayPoint);

//helper functions
// function resolveGoogle(){
//   console.log('google resolve');
//   $googleDefer.resolve();
// }

function setMapCenter(bounds) {
  //Event listener for centering map
  controlUI.addEventListener('click', function() {
    map.fitBounds(bounds);
  });
}

function createWPOutput(waypts) {
  var $WPOutput = $('#WPOutput');
  $WPOutput.html('');
  waypts.forEach(function(waypt) {
    $WPOutput.append('<option>' + waypt.location + '</option>');
  });
}

function addWayPoint(e) {
  e.preventDefault();
  var waypt = {
    location: $('#waypoint').val(),
    stopover: true
  };
  waypts.push(waypt);
  createWPOutput(waypts);
}

function removeWayPoint(e) {
  waypts = [];
  e.preventDefault();
  $wayptToAdd = $('#WPOutput').children(':not(:selected)');
  for (var ii = 0; ii < $wayptToAdd.length; ii++) {
    var $waypt = $($wayptToAdd[ii]);
    var waypt = {
      location: $waypt.text(),
      stopover: true
    }
    waypts.push(waypt);
  }
  createWPOutput(waypts);
}
function sum(prev, current) {
  return prev + current;
}
function grabInput(){
  var userInput = {};
  userInput.start = $('#start').val();
  userInput.end = $('#end').val();
  userInput.waypts = $('#WPOutput').html();
  userInput.carSelection = $('.carSelection').html();
  userInput.carYear = $('.carYear option:selected').val();
  userInput.carMake = $('.carMake option:selected').val();
  userInput.carModel = $('.carModel option:selected').val();
  userInput.carVersion = $('.carVersion option:selected').val();
  localStorage.setItem('userInput',JSON.stringify(userInput));
}
vehicleRequest.userId = function (vehicleID) {
  var $errorVehicle = $('.errorVehicle');
  var $avgMpg = $('.avgMpg');
  var $minMpg = $('.minMpg');
  var $maxMpg = $('.maxMpg');
  $errorVehicle.html('');
  console.log(vehicleID);
  ajaxRequest = $.ajax({
    type: "GET",
    url: 'https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/' + vehicleID,
    dataType: "xml",
    statusCode: {
      404: function() {
                            //resets and error message in drop down section
                            $errorVehicle.append('Sorry, we could not find the information about the vehicle.');
                            $carYear.val(0);
                            $carMake.val(0);
                            $carModel.val(0);
                            $carVersion.val(0);
                          }
                        }
                      });
  // console.log(xml);
  ajaxRequest.done(function(xml) {
    $(xml).find("avgMpg").each(function() {
      metaMpgData.avgmpg = Math.round(parseInt($(this).text()));
      console.log(metaMpgData.avgmpg);
      $avgMpg.append($(this).text());
    });
    $(xml).find("maxMpg").each(function() {
      metaMpgData.maxmpg = $(this).text();
      $maxMpg.append($(this).text());
    });
    $(xml).find("minMpg").each(function() {
      metaMpgData.minmpg = $(this).text();
      $minMpg.append($(this).text());
      console.log(metaMpgData);
    });
    $vehicleDefer.resolve();
    console.log("vehicle defer resolved");

  })
            } //userCarId
// function result(){
//   $resultDefer.resolve();
// }

//Calling routing and mapping functions
// $.when($googleDefer,$resultDefer).done(initMap);
function initMap() {
  console.log(1);
  var mapElem = $('#map')[0];
  map = new google.maps.Map(mapElem, {
    zoom: 7,
    center: {
      lat: 45.5425909,
      lng: -122.7948514
    }, // Portland, OR
    scrollwheel: false
  }); //end of specifying map obj
  //Declare variables as objs that will get passed to calculateAndDisplayRoute in the even listener below
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  //Creating centering map tile control UI
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

  $('#submit').on('click', function(e){
    e.preventDefault();
    grabInput();
    calculateAndDisplayRoute(directionsService, directionsDisplay, map);
    $('.carSelection').hide();
    $('#userInput').hide();
    $('#pageResults').show();
    google.maps.event.trigger(map, 'resize');
    if(typeof vehicleID==='undefined'){
      vehicleID = localStorage.getItem('vehicleID');
      vehicleRequest.userId(vehicleID);
    }
  });
  $('#tripGenButton').on('click', function(e) {
    e.preventDefault;
    $('.carSelection').hide();
    $('#tripGenButton').hide();
    $('#pageResults').show();
    console.log(userRandomTrip);
    var randomTrip = userRandomTrip[0];
    randomTripGenerator(directionsService, directionsDisplay, randomTrip);
  });
  // renderResults();
} //end of initmap

function randomTripGenerator(directionsService, directionsDisplay, userRandomTrip) {
  var waypointArray = userRandomTrip.midpoints;
  var stopovers = [];
  waypointArray.forEach(function(waypt) {
    var stopover = {
      location: waypt,
      stopover: true
    };
    stopovers.push(stopover);
  });
  var request = {
    origin: userRandomTrip.start,
    destination: userRandomTrip.end,
    waypoints: stopovers,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }
  directionsService.route(request, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var routes = response.routes;
      var bounds = routes[0].bounds;
      setMapCenter(bounds);
      var $summaryPanel = $('#directions-panel');
      var $total = $('#total');
      $summaryPanel.html(''); //clear directions panel to display more output
      routes.forEach(function(route) {
        var lat, lng;
        var distances = [];
        var counter = 1;
        route.legs.forEach(function(leg) {
          var routeSegment = '<b>Segment ' + counter + '</b><br>';
          var start_address = 'Start: ' + leg.start_address + '<br>';
          var end_address = 'End: ' + leg.end_address + '<br>';
          var distance = leg.distance.text + '<br>';
          distances.push(leg.distance.value);
          var insert = routeSegment + start_address + end_address + distance;
          $summaryPanel.append(insert);
          counter++;
        }); //end of route.leg.forEach
        //Print out total distance
        var totalDistance = distances.reduce(sum);
        $total.html('');
        user.distance = (Math.round(totalDistance * 0.000621371 * 100) / 100);
        buildUserObject();
        printCostDistAndGas();
        costChartTrigger();
        mpgChartTrigger();
        $distanceDefer.resolve();
        console.log("DistanceDefer resolved");
        console.log("user's total distance in miles: " + user.distance);
        $total.append((user.distance) + ' miles' + '<br>');
      }); //end of routes.forEach. Outputing distances, calculate prices

} else {
  window.alert('Directions request failed due to ' + status);
}
  }); //end of directionsService.route call
} // end of randomTripGnerator

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  console.log(waypts);
  var avoidHighways = $('[name = avoidHighways]:checked').length;
  var avoidTolls = $('[name = avoidTolls]:checked').length;
  if (waypts.length > 0) {
    var request = {
      origin: $('#start').val(),
      destination: $('#end').val(),
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    };
    if (avoidHighways == 1) {
      request.avoidHighways = true;
    }
    if (avoidTolls == 1) {
      request.avoidTolls = true;
    }
  } else {
    var request = {
      origin: $('#start').val(),
      destination: $('#end').val(),
      travelMode: google.maps.TravelMode.DRIVING
    };
    if (avoidHighways == 1) {
      request.avoidHighways = true;
    }
    if (avoidTolls == 1) {
      request.avoidTolls = true;
    }
    console.log(request);
  } //end of if-else request preparation
  directionsService.route(request, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {

      directionsDisplay.setDirections(response);
      var routes = response.routes;
      console.log(routes);
      var bounds = routes[0].bounds;
      setMapCenter(bounds);
      //calculate and print out distances
      var $summaryPanel = $('#directions-panel');
      var $total = $('#total');
      $summaryPanel.html(''); //clear directions panel to display more output
      routes.forEach(function(route) {
        var lat, lng;
        var distances = [];
        var counter = 1;
        route.legs.forEach(function(leg) {
          var routeSegment = '<b>Segment ' + counter + '</b><br>';
          var start_address = 'Start: ' + leg.start_address + '<br>';
          var end_address = 'End: ' + leg.end_address + '<br>';
          var distance = leg.distance.text + '<br>';
          distances.push(leg.distance.value);
          var insert = routeSegment + start_address + end_address + distance;
          $summaryPanel.append(insert);
          counter++;
        }); //end of route.leg.forEach
        //Print out total distance
        var totalDistance = distances.reduce(sum);
        $total.html('');
        user.distance = (Math.round(totalDistance * 0.000621371 * 100) / 100);
        $distanceDefer.resolve();
        console.log("DistanceDefer resolved");
        console.log("user's total distance in miles: " + user.distance);
        $total.append((user.distance) + ' miles' + '<br>');

      }); //end of routes.forEach. Outputing distances, calculate prices

} else {
  window.alert('Directions request failed due to ' + status);
}
  }); //end of directionsService.route call
}
