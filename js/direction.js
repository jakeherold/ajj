var waypts = [];
var user = {};
var $distanceDefer = $.Deferred();

$('#submitWP').on('click',addWayPoint);
$('#clearMidPoint').on('click',removeWayPoint);

//helper functions
function createWPOutput(waypts){
  var $WPOutput = $('#WPOutput');
  $WPOutput.html('');
  waypts.forEach(function(waypt){
    $WPOutput.append('<option>'+waypt.location+'</option>');
  });
}
function addWayPoint(e){
  e.preventDefault();
  var waypt = {
    location: $('#waypoint').val(),
    stopover: true
  };
    waypts.push(waypt) ;
    createWPOutput(waypts);
}
function removeWayPoint(e){
  waypts = [];
  e.preventDefault();
  $wayptToAdd = $('#WPOutput').children(':not(:selected)');
  for (var ii = 0; ii<$wayptToAdd.length;ii++){
    var $waypt = $($wayptToAdd[ii]);
    var waypt = {
      location: $waypt.text(),
      stopover:true
    }
    waypts.push(waypt);
  }
  createWPOutput(waypts);
}

function sum (prev, current){
  return prev+current;
}

//Calling routing and mapping functions
function initMap (){
  console.log(1);
  var mapElem = $('#map')[0];
  var map = new google.maps.Map(mapElem,
            {
              zoom: 7,
              center: {lat: 45.5425909, lng: -122.7948514}  // Portland, OR
            });//end of specifying map obj
  //Declare variables as objs that will get passed to calculateAndDisplayRoute in the even listener below
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);
  //Event listener for submit 'button'
  $('#submit').on('click', function(e){
    e.preventDefault();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });//end of submit button event listener
}//end of initmap

function calculateAndDisplayRoute(directionsService, directionsDisplay){
  console.log(waypts);
  var avoidHighways = $('[name = avoidHighways]:checked').length;
  var avoidTolls = $('[name = avoidTolls]:checked').length;
  if (waypts.length >0){
    var request = {
      origin: $('#start').val(),
      destination: $('#end').val(),
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    };
    if (avoidHighways==1){
      request.avoidHighways = true;
    }
    if (avoidTolls==1){
      request.avoidTolls = true;
    }
  }
  else{
    var request = {
      origin: $('#start').val(),
      destination: $('#end').val(),
      travelMode: google.maps.TravelMode.DRIVING
    };
    if (avoidHighways==1){
      request.avoidHighways = true;
    }
    if (avoidTolls==1){
      request.avoidTolls = true;
    }
    console.log(request);
  }//end of if-else request preparation
  directionsService.route(request,function(response, status){
    if(status===google.maps.DirectionsStatus.OK){
      directionsDisplay.setDirections(response);
      var routes = response.routes;
      console.log(response);
      var $summaryPanel = $('#directions-panel');
      var $total = $('#total');
      $summaryPanel.html(''); //clear directions panel to display more output
      routes.forEach(function(route){
        var distances = [];
        var counter = 1;
        route.legs.forEach(function(leg){
          var routeSegment = '<b>Segment '+counter+'</b><br>';
          var start_address = 'Start: '+leg.start_address+'<br>';
          var end_address = 'End: '+leg.end_address+'<br>';
          var distance = leg.distance.text+'<br>';
          distances.push(leg.distance.value);
          var insert = routeSegment+start_address+end_address+distance;
          $summaryPanel.append(insert);
          counter++;
        });//end of route.leg.forEach
        var totalDistance = distances.reduce(sum);
        $total.html('');

        user.distance = (Math.round(totalDistance*0.000621371*100)/100);
        $distanceDefer.resolve();
        console.log("DistanceDefer resolved");
        console.log("user's total distance in miles: "+ user.distance);
        $total.append((user.distance)+' miles'+ '<br>');
      });//end of routes.forEach. Outputing distances, calculate prices
    }
    else{
      window.alert('Directions request failed due to ' + status);
    }
  });//end of directionsService.route call
}
