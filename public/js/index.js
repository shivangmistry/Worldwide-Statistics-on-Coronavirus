$(document).init(() => {
    
    $.get('/data', (data, status) => {
        console.log(data + status);
    });

});

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}

function deathData() {
    $(".deathsDiv").css('display', 'block');
    $(".recoveredDiv").css('display', 'none');
    $("#deathsButton").addClass('activeTab');
    $("#recoveredButton").removeClass('activeTab');
}

function recoveredData() {
    $(".deathsDiv").css('display', 'none');
    $(".recoveredDiv").css('display', 'block');
    $("#deathsButton").removeClass('activeTab');
    $("#recoveredButton").addClass('activeTab');
}