$(function(){

  //onLoad screen
  $('#pageResults').hide();
  $('.tripGen').hide();
  $('.aboutUs').hide();
  $('#userInput').show();

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

  }
  else {
    console.log("Local data not set. Need user input");
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
  console.log('home ran')
};
function about() {
  $('#pageResults').hide();
  $('#userInput').hide();
  $('.tripGen').hide();
  $('.aboutUs').show();
  console.log('about ran')
};
function tripGen() {
  $('#pageResults').hide();
  $('#userInput').hide();
  $('.aboutUs').hide();
  $('.tripGen').show();
  console.log('tripgen ran')
};
