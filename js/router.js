$(function() {
    $('#pageResults').hide();
    $('.tripGen').hide();
    $('.aboutUs').hide();
    $('#userInput').show();
page.base('/');
page('about', about);
page('trip', tripGen);
page();

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
});
$('#homeButt').on('click', function(){
    location.reload();
});
});
