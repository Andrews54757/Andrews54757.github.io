var $window = $(window);

$('.moveup').each(function () {
    var background = $(this);
    $window.scroll(function () {
        var yPos = -($window.scrollTop() / background.data('speed'));

        // Put together our final background position
        var coords = '50% ' + yPos + 'px';

        // Move the background
        background.css({
            backgroundPosition: coords
        });
    });
});

$('.movedown').each(function () {
    var background = $(this);
    $window.scroll(function () {
        var yPos = ($window.scrollTop() / background.data('speed'));

        // Put together our final background position
        var coords = '50% ' + yPos + 'px';

        // Move the background
        background.css({
            backgroundPosition: coords
        });
    });
});
var text = $('#logoname');
var shown = false;
$window.scroll(function () {
    var pos = $window.scrollTop();

    if (pos > 300) {
        if (!shown) {
            text.animate({
                maxWidth: '220px'
            }, 300, 'swing', function () {
                text.animate({
                    opacity: 1
                }, 300, 'swing')
            })
            shown = true;
        }
    } else {
        if (shown) {
            text.animate({
                opacity: 0
            }, 300, 'swing', function () {

                text.animate({
                    maxWidth: '0px'
                }, 300, 'swing', function () {

                });
            });

            shown = false;
        }
    }



})

$("#logodiv").click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 700);
});
