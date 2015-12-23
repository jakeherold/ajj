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
});
