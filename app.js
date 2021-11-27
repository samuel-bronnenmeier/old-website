function getYOff(elem) {
    return elem.getBoundingClientRect().top + window.scrollY;
}

function init() {
    if ($(".title").width() + 20 > $(".title").height()) {
        //Size the title according to the device's height
        $(".title")
        .height($(window).height() - getYOff($(".title")[0]))
        .css("font-size", $(".title").height() / 3);
    } else {
        //Size the title according to the device's height
        $(".title")
        .height($(window).height() - getYOff($(".title")[0]) + 100)
        .css("font-size", $(".title").height() / 5);
    }

    //Size the gradient under the title
    $(".help-grad")
    .height($(".title").height() / 3);

    //Size the under title
    $(".under-title").css("font-size", ($(".title").height() / 7) + "px");
}

$(document).ready(function() {
    init();

    //Fade in the title and under-title
    $(".title").html("<span class='text'>I have the solution.</span>");
    $(".title .text").hide();
    $(".title .text").fadeIn(2000);
});

$(window).resize(function () {
    init();
});