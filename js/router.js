//base hide/show
//if you try and do OOP here it throws an endless routing loop.
//is a refrenced issue in pages.js repo.
var route = route || {};
$(function() {
    $('#pageResults').hide();
    $('.tripGen').hide();
    $('.aboutUs').hide();
    $('#userInput').show();
//routing
page.base('/');
page('home', myHome);
page('about', about);
page('trip', tripGen);
// page('results', result);
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
    $('#tripGenButton').show();
    console.log('tripgen ran')
};
$('.backButt').on('click', function() {
    location.reload();
})
});
