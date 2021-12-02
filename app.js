function getYOff(elem) {
    return elem.getBoundingClientRect().top + window.scrollY;
}

function init() {
    if ($(window).width() + 20 > $(window).height()) {

        //Size the title according to the device's height
        $(".title")
        .height($(window).height() - getYOff($(".title")[0]))
        .css("font-size", $(".title").height() / 3);

    } else {

        //Size the title according to the device's width
        $(".title")
        .height($(window).height() - getYOff($(".title")[0]) + 100)
        .css("font-size", ($(".title").width() / 5) + "px");

    }

    //Size the under title
    $(".under-title").css("font-size", ($(".title").height() / 9) + "px");
}

$(document).ready(function() {
    init();

    //Fade in the title
    //$(".title").html("<span class='text'>I have the solution.</span>");
    $(".title .text").hide();

    //$(".under-title").html("<span class='text'>It just doesn't fit the problem...</span>");
    $(".under-title .text").css("visibility", "hidden");

    $(".title .text").fadeIn(2300, function() {

        $(".under-title .text").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 2000);

    });
});

$(window).resize(function () {
    init();
});