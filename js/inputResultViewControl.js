var mainControl    = {};
var resultsControl = {};

//On load view

function mainControl(){
  $('#pageResults').hide();
};
page('./', mainControl());
//On submit results viewxs
//Event listener for submit 'button'
resultsControl.index = function() {
$('#submit').on('click', function(e){
  console.log('submittng map instructions');
  e.preventDefault();
  calculateAndDisplayRoute(directionsService, directionsDisplay,map);
  $('#userInput').hide();
  $('#pageResults').show();
  google.maps.event.trigger(map, 'resize');
});//end of submit button event listener
//Event listener for back button
$('#back').on('click', function(e){
  e.preventDefault();
  $('#userInput').show();
  $('#pageResults').hide();
});//end of back button listener
}

//page('./results', resultsControl.index());
