$(document).init(() => {
    var x = document.cookie;
    if(x) {
        $(".notLoggedIn").css("display", "none");

        $(".isLoggedIn").hover(function () {
            $(".menuItems").fadeToggle(200);
        })
    } else {
        $(".isLoggedIn").css("display", "none");
    }

    $('.menuButton').hover(function() {
        $('.menuItems').fadeToggle(300);
    })
})

function goBack() {
    window.history.back();
}

function handleLogout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}
