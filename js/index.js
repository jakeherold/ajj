$(function(){


// $.ajax({
//   type:'GET',
//   url: 'http://www.fueleconomy.gov/ws/rest/fuelprices',
//   success: function(data){
//     console.log(data);


//   }
// });
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.fueleconomy.gov/ws/rest/fuelprices', true);
xhr.send();

xhr.onload = function(data){
  console.log(data);
}
console.log("what the fuck is goin on here?");

}); //ends IIFE
