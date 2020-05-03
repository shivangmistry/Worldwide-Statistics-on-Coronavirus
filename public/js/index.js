var map;
var currentCountry, countrySelected;

// call when document is ready 
$(initData);

function initData() {
  currentCountry = "worldData";
  countrySelected = false;
  getMapData();
  getWorldData();
  //initColumnConfirmedView();
  
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

function confirmedDailyData() {
  $(".confirmedDailyDiv").css('display', 'block');
  $("#confirmedDailyButton").addClass('activeTab');
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


// fetch map data
function getMapData() {
  $.get('/mapData', (data) => {
    if(data.message==="success") {
      // addMarkers(data.geoLocation);
      // console.log(data.data);
      initMapView(data.data);
    } else if(data.message==="error") {
      alert(data.data);
    }
  })
}

function addDailyConfirmedData(data) {
 
  if(data!=null){
    var result = data.map(function(item) {

      return Object.values(item);
    });
  console.log(result)
  temp =[];
  
  var res_res = result.map(function(item){
      temp = Object.values(item[0])
      temp.push(item[1])
      return temp; 
  });
  res_res.splice(0, 0,['Date','Confirmed']);
  console.log(res_res)
    initColumnConfirmedView(res_res);
  }
  else{
    alert(data.data);
  }
  
}


// fetch gloabal data as default dashboard state
function getWorldData() {
  $.get('/data', (data) => {
    if(data.message==="success") {
      console.log(data);
      addConfirmedData(data.confirmed);
      addDeathsData(data.deaths);
      addRecoveredData(data.recovered);
      addDailyConfirmedData(data.dailyCases)
    } else if(data.message=="error") {
      alert(data.data);
    }
  });
}

// fetch country data
function getCountryData(country) {
  console.log("Hello 2")
  $.get('/country/' + country, (data) => {
    if(data.message==="success"){
      addConfirmedData(data.confirmed);
      addDeathsData(data.deaths);
      addRecoveredData(data.recovered);
      addDailyConfirmedData(data.dailyCases)
    } else if(data.message==="error") {
      alert(data.data);
    }
  })
}



// show map
function initMapView(mapData) {
  console.log(mapData);
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


      var Graph = new google.visualization.ColumnChart(document.getElementById('DailyConfirmedDiv'));
      Graph.draw(Graphdata);
    }
}

// table confirmed cases
function addConfirmedData(data) {
  let count = 0
  const table = document.getElementById("confirmedTableBody");
  $("#confirmedTableBody tr").remove();
  if(table!=null){
    data.forEach(d => {
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorConfirmed'>" + addCommas(d.confirmed) + "</span></td><td><span class='countLocation'>" + d._id.Country + "</span></td>";
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
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorDeaths'>" + addCommas(d.deaths) + "</span></td><td><span class='countLocation'>" + d._id.Country + "</span></td>";
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
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorRecovered'>" + addCommas(d.recovered) + "</span></td><td><span class='countLocation'>" + d._id.Country + "</span></td>";
      row.onclick = changeCountry;
      row.setAttribute("value", d._id.Country);
      table.appendChild(row);
      count += d.recovered;
    });
  }
  $('#totalRecovered').html(addCommas(count));
}

// table row on click listener
function changeCountry() {
  console.log("Hello 1")
  if($(this).is('tr')) {
    if(currentCountry !== this.getAttribute('value') && !countrySelected) {
      const country = this.getAttribute('value');
      currentCountry = country;
      countrySelected = true;
      console.log("Request data for country: " + country);
      getCountryData(country);
    }
  } else {
    if (currentCountry !== "worldData") {
      currentCountry = "worldData";
      countrySelected = false;
      console.log("Request World data");
      getWorldData();
    }
  }
}

function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 0, lng: 0 },
//         zoom: 2,
//         styles: [
//             {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
//             {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
//             {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
//             {
//               featureType: 'administrative.locality',
//               elementType: 'labels.text.fill',
//               stylers: [{color: '#d59563'}]
//             },
//             {
//               featureType: 'poi',
//               elementType: 'labels.text.fill',
//               stylers: [{color: '#d59563'}]
//             },
//             {
//               featureType: 'poi.park',
//               elementType: 'geometry',
//               stylers: [{color: '#263c3f'}]
//             },
//             {
//               featureType: 'poi.park',
//               elementType: 'labels.text.fill',
//               stylers: [{color: '#6b9a76'}]
//             },
//             {
//               featureType: 'road',
//               elementType: 'geometry',
//               stylers: [{color: '#38414e'}]
//             },
//             {
//               featureType: 'road',
//               elementType: 'geometry.stroke',
//               stylers: [{color: '#212a37'}]
//             },
//             {
//               featureType: 'road',
//               elementType: 'labels.text.fill',
//               stylers: [{color: '#9ca5b3'}]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'geometry',
//               stylers: [{color: '#746855'}]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'geometry.stroke',
//               stylers: [{color: '#1f2835'}]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'labels.text.fill',
//               stylers: [{color: '#f3d19c'}]
//             },
//             {
//               featureType: 'transit',
//               elementType: 'geometry',
//               stylers: [{color: '#2f3948'}]
//             },
//             {
//               featureType: 'transit.station',
//               elementType: 'labels.text.fill',
//               stylers: [{color: '#d59563'}]
//             },
//             {
//               featureType: 'water',
//               elementType: 'geometry',
//               stylers: [{color: '#17263c'}]
//             },
//             {
//               featureType: 'water',
//               elementType: 'labels.text.fill',
//               stylers: [{color: '#515c6d'}]
//             },
//             {
//               featureType: 'water',
//               elementType: 'labels.text.stroke',
//               stylers: [{color: '#17263c'}]
//             }
//           ]
//     });
// }

// map markers
// function addMarkers(data) {
//   data.forEach(city => {
//     var cityCircle = new google.maps.Circle({
//       strokeColor: '#FF0000',
//       strokeOpacity: 0.35,
//       strokeWeight: 0,
//       fillColor: '#FF0000',
//       fillOpacity: 0.35,
//       map: map,
//       center: { lat: parseFloat(city._id.Latitude), lng: parseFloat(city._id.Longitude) },
//       radius: parseInt(city.confirmed)*2.5
//     });
//   });
// }