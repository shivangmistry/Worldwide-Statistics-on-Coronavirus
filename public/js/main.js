$(document).init(() => {
    var x = document.cookie;
    if(x) {
        $(".notLoggedIn").css("display", "none");
    } else {
        $(".isLoggedIn").css("display", "none");
    }

    $('.menuButton').hover(function() {
        $('.menuItems').fadeToggle(300);
    })
})
