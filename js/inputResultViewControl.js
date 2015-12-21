//routing
page.base('/');
page('home', myHome);
page('about', about);
page('trip', tripGen);
page();

//onLoad screen
$('#pageResults').hide();
$('.tripGen').hide();
$('.aboutUs').hide();
$('#userInput').show();

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
