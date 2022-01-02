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
    $(".title .text").hide();

    $(".under-title .text").css("opacity", 0);

    $(".title .text").fadeIn(2300);

    //$(".under-title .text").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 2000);
    const underTitle = document.querySelector(".under-title .text");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
            if (entry.isIntersecting) observer.unobserve(entry.target);
        });
    }, {
        threshold: 1,
    });

    observer.observe(underTitle);
});

$(window).resize(function () {
    init();
});