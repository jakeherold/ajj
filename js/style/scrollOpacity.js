var header    = $('header');
var navLink  = $('ul');
var range     = 200;

$(window).on('scroll', function() {

    var scrollTop = $(this).scrollTop();
    var offset    = header.offset().top;
    var height    = header.outerHeight();

        offset    = offset + height / 2;
    var calc      = 1 - (scrollTop - offset + range) / range;

    header.css({
        'opacity': calc
    });

    if (calc > '1') {
        header.css({'opacity': 1});


    } else if (calc < '0') {
        header.css({'opacity': 0});
    }

});
