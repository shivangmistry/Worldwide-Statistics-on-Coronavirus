$(document).init(() => {
    
    $.get('/data', (data, status) => {
        console.log(data + status);
    });

});

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