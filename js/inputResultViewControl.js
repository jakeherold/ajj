$(function(){
  var user = user || {};
  //onLoad screen
  $('#pageResults').hide();
  $('.tripGen').hide();
  $('.aboutUs').hide();
  $('#userInput').show();
  localBonkersShit = localStorage.getItem('superBonkers shit');
  console.log(localBonkersShit);
  localStorageData = localStorage.getItem('avgMpg');
  if (localStorageData){
    console.log("Local Storage Data Exists");
    user.avgMpg         =  localStorage.getItem('avgMpg');
    user.maxMpg         =  localStorage.getItem('maxMpg');
    user.minMpg         =  localStorage.getItem('minMpg');
    user.gasQuantityAvg =  localStorage.getItem('gasQuantityAvg');;
    user.gasQuantityMax =  localStorage.getItem('gasQuantityMax');
    user.gasQuantityMin =  localStorage.getItem('gasQuantityMin');
    user.costReg        =  localStorage.getItem('costReg');
    user.costMid        =  localStorage.getItem('costMid');
    user.costPrem       =  localStorage.getItem('costPrem');
    console.log(user);
    var whatWeGetBack = localStorage.getItem('randomTripString');
    console.log(whatWeGetBack);
    var realItem = JSON.parse(whatWeGetBack);
    console.log(realItem)
    randomTripGenerator(directionsService, directionsDisplay, realItem);

  }
  else {
    console.log("Local data not set. Need user input");
    $localStorageDefer.resolve();
  }
});

//routing
  page.base('/');
  page('home', myHome);
  page('about', about);
  page('trip', tripGen);
  page();

//home hide/show
function myHome() {
  $('#pageResults').hide();
  $('.tripGen').hide();
  $('.aboutUs').hide();
  $('#userInput').show();
  $('.carSelection').show();
  console.log('home ran')
};
function about() {
  $('#pageResults').hide();
  $('#userInput').hide();
  $('.carSelection').hide();
  $('.tripGen').hide();
  $('.aboutUs').show();
  console.log('about ran')
};
function tripGen() {
  $('#pageResults').hide();
  $('#userInput').hide();
  $('.aboutUs').hide();
  $('.carSelection').show();
  $('.tripGen').show();
  console.log('tripgen ran')
};
