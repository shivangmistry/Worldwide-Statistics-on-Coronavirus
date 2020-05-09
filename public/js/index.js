var map;
var currentCountry, countrySelected;
var dailyConfirmed = [];
var dailyDeaths = [];


// call when document is ready 
$(initData);

function initData() {
  currentCountry = "Worldwide";
  countrySelected = false;
  $('.currentCountry').html(currentCountry);
  getMapData();
  getWorldData();
  initageData();
}

// Table div switch
function confirmedData() {
  $(".confirmedDiv").css('display', 'block');
  $(".deathsDiv").css('display', 'none');
  $(".recoveredDiv").css('display', 'none');
  $("#confirmedButton").addClass('activeTab');
  $("#deathsButton").removeClass('activeTab');
  $("#recoveredButton").removeClass('activeTab');
}

// Table div switch
function deathData() {
  $(".confirmedDiv").css('display', 'none');
  $(".deathsDiv").css('display', 'block');
  $(".recoveredDiv").css('display', 'none');
  $("#confirmedButton").removeClass('activeTab');
  $("#deathsButton").addClass('activeTab');
  $("#recoveredButton").removeClass('activeTab');
}

// Table div switch
function recoveredData() {
  $(".confirmedDiv").css('display', 'none');
  $(".deathsDiv").css('display', 'none');
  $(".recoveredDiv").css('display', 'block');
  $("#confirmedButton").removeClass('activeTab');
  $("#deathsButton").removeClass('activeTab');
  $("#recoveredButton").addClass('activeTab');
}

// daily graph switch
function confirmedDailyData() {
  initColumnConfirmedView(dailyConfirmed);
  $("#confirmedDailyButton").addClass('activeTab');
  $("#DailydeathsButton").removeClass('activeTab');
}

// daily graph switch
function deathDailyData() {
  initColumnConfirmedView(dailyDeaths);
  $("#confirmedDailyButton").removeClass('activeTab');
  $("#DailydeathsButton").addClass('activeTab');
}

// fetch map data
function getMapData() {
  $.get('/mapData', (data) => {
    if(data.message==="success") {
      initMapView(data.data);
    } else if(data.message==="error") {
      alert(data.data);
    }
  });
}

function addDailyConfirmedData(data) {
 
  if(data!=null){
    var result = data.map(function(item) {

      return Object.values(item);
    });
    // console.log(result)
    Confirmed_table =[];
    //Fetch Confirmed Cases per country per date
    var result_confirmed = result.map(function(item){
        Confirmed_table = Object.values(item[0])
        Confirmed_table.push(item[1])
        return Confirmed_table; 
    });
    result_confirmed.splice(0, 0,['Date','Confirmed']);
    // console.log(result_confirmed)
    dailyConfirmed = result_confirmed;

    //Fetch Deaths Cases per country per date
    Deaths_table =[];
    var result_deaths = result.map(function(item){
      Deaths_table = Object.values(item[0])
      Deaths_table.push(item[2])
      return Deaths_table; 
    });
    result_deaths.splice(0, 0,['Date','Deaths']);
    // console.log(result_deaths )
    dailyDeaths = result_deaths;

    if ($("#confirmedDailyButton").hasClass("activeTab")) initColumnConfirmedView(dailyConfirmed);
    else initColumnConfirmedView(dailyDeaths);
  
  }
  else{
    alert(data.data);
  }
  
}

function ageData() {
  return [
      ["Age", "Percentage"],
      ["0-17", 0.04],
      ["18-44", 4.50],
      ["45-64", 23.10],
      ["65-74", 24.60],
      ["75+", 47.70],
  ]
}

function initageData(){
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var agedata = google.visualization.arrayToDataTable(ageData());
    var options = {
      width: '100%',
        height: 240,
      pieHole: 0.4,
      backgroundColor:"#FFF",
      colors: ['#d6d6d6', '#f0b1b4', '#e66368', '#962025', '#300204'],
      chartArea: {
        left: "3%",
        top: "5%",
        bottom:"10%",
        height: "100%",
        width: "94%"
      },
      legend: {
        position:'bottom',
        textStyle: {
            color: '#000'
        }
      },
    };
    var donutchart = new google.visualization.PieChart(document.getElementById('ageInsideDiv'));
    donutchart.draw(agedata, options);
  }
}

// fetch gloabal data as default dashboard state
function getWorldData() {
  $.get('/data', (data) => {
    if(data.message==="success") {
      // console.log(data);
      addConfirmedData(data.confirmed);
      addDeathsData(data.deaths);
      addRecoveredData(data.recovered);
      addDailyConfirmedData(data.WorlddailyCases);
      addWorldGenderCases(data.WorldGenderCases);
    } else if(data.message=="error") {
      alert(data.data);
    }
  });
}

// fetch country data
function getCountryData(country) {
  $.get('/country/' + country, (data) => {
    if(data.message==="success"){
      addConfirmedData(data.confirmed);
      addDeathsData(data.deaths);
      addRecoveredData(data.recovered);
      addDailyConfirmedData(data.dailyCases)
      addWorldGenderCases(data.CountryGenderCases);
    } else if(data.message==="error") {
      alert(data.data);
    }
  })
}

// show map
function initMapView(mapData) {
  // console.log(mapData);
  google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyCnFY9KoVBajKdQ1CRzvwCmDJxS4YWUP1I'
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(mapData);

    var options = {
      colors: ["#FFD0C6","#FFBAAB","#FEA28F","#FF8C73","#FF7355","#FE5A37","#FF441C","#FF3104","#EF2A00","#D12500","#A81E00","6D1300"],
    };

    var chart = new google.visualization.GeoChart(document.getElementById('map'));
    chart.draw(data, options);
  }
}

function initColumnConfirmedView(graphData) {
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawStacked);

  function drawStacked() {
      var Graphdata = new google.visualization.arrayToDataTable(graphData);

    var options = {
      title: "Daily Cases Registered: " + currentCountry,
      legend: { position: "none" },
      hAxis: { showTextEvery: 15},
      trendlines: {
          color: 'green',
      }
    };

      var Graph = new google.visualization.LineChart(document.getElementById('DailyConfirmedCases'));
      Graph.draw(Graphdata, options);
    }
}

//Bar chart for Gender Based statistics
function initBarGenderView(BarData){
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var Bardata = new google.visualization.arrayToDataTable(BarData);

        var options = {
          height: 240,
          width:'100%',
          legend: {position: 'bottom'},
          backgroundColor:"#FFF",
          colors: ['#e66368', '#300204'],
          hAxis: {
            textStyle: {
                color: '#000'
            }
        },
        vAxis: {
            textStyle: {
                color: '#000'
            }
        },
        legend: {
            position: 'top'
        },
        titleTextStyle: {
            color: '#000'
        },
        chartArea: {
          left: "17%",
          top: "10%",
          right: "10%",
          bottom:"10%",
          height: "94%",
          width: "94%"
      }

        };

        var Barchart = new google.visualization.ColumnChart(document.getElementById('Gender_Charts'));

        Barchart.draw(Bardata, options);
  }
}

// table confirmed cases
function addConfirmedData(data) {
  let count = 0
  const table = document.getElementById("confirmedTableBody");
  $("#confirmedTableBody tr").remove();
  if(table!=null){
    data.forEach(d => {
      let location = "";
      if(d._id.Country==="") location = "Other";
      else location = d._id.Country;
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorConfirmed'>" + addCommas(d.confirmed) + "</span></td><td><span class='countLocation'>" + location + "</span></td>";
      row.onclick = changeCountry;
      row.setAttribute("value", d._id.Country);
      table.appendChild(row);
      count += d.confirmed;
    });
  }
  $('#totalConfirmed').html(addCommas(count));
}

// table death cases
function addDeathsData(data) {
  let count = 0
  const table = document.getElementById("deathsTableBody");
  $("#deathsTableBody tr").remove();
  if (table != null) {
    data.forEach(d => {
      let location = "";
      if(d._id.Country==="") location = "Other";
      else location = d._id.Country;
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorDeaths'>" + addCommas(d.deaths) + "</span></td><td><span class='countLocation'>" + location + "</span></td>";
      row.onclick = changeCountry;
      row.setAttribute("value", d._id.Country);
      table.appendChild(row);
      count += d.deaths;
    });
  }
  $('#totalDeaths').html(addCommas(count));
}

// table recovered cases
function addRecoveredData(data) {
  let count = 0
  const table = document.getElementById("recoveredTableBody");
  $("#recoveredTableBody tr").remove();
  if (table != null) {
    data.forEach(d => {
      let location = "";
      if(d._id.Country==="") location = "Other";
      else location = d._id.Country;
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorRecovered'>" + addCommas(d.recovered) + "</span></td><td><span class='countLocation'>" + location + "</span></td>";
      row.onclick = changeCountry;
      row.setAttribute("value", d._id.Country);
      table.appendChild(row);
      count += d.recovered;
    });
  }
  $('#totalRecovered').html(addCommas(count));
}

//Worldwide Gender Cases
function addWorldGenderCases(data){
  var result = data.map(function(item) {
    return Object.values(item);
  });

  temp =[];
  res_res = [];
    t = result[0]
    temp = ["Male"]
    temp.push(t[1])
    temp.push(t[3])
    res_res.push(temp)
    temp = ["Female"]
    temp.push(t[2])
    temp.push(t[4])
    res_res.push(temp)
    res_res.splice(0, 0,['Gender','ConfirmedCases','Deaths']);
    initBarGenderView(res_res);
}

// table row on click listener
function changeCountry() {
  if($(this).is('tr')) {
    if(currentCountry !== this.getAttribute('value') && !countrySelected) {
      const country = this.getAttribute('value');
      currentCountry = country;
      countrySelected = true;
      console.log("Request data for country: " + country);
      $('.currentCountry').html(currentCountry);
      changeCountryAnimation();
      getCountryData(country);
    }
  } else {
    if (currentCountry !== "Worldwide") {
      currentCountry = "Worldwide";
      countrySelected = false;
      console.log("Request World data");
      $('.currentCountry').html(currentCountry);
      changeCountryAnimation();
      getWorldData();
    }
  }
}

function changeCountryAnimation() {
  $('.fa-globe, .tabButton, .genderDiv').addClass('transform-active');
  setTimeout(function () {
    $('.fa-globe, .tabButton, .genderDiv').removeClass('transform-active');
  }, 2000);
}

function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
