var map;
var currentCountry, countrySelected;

// call when document is ready 
$(initData);

function initData() {
  
  currentCountry = "worldData";
  countrySelected = false;
  
  // $.get('/data', (data, status) => {
  //   console.log(data)
  //   console.log(status);
  // });

  const data = [
    { "confirmed": "963, 168", "country": "US" },
    { "confirmed": "226, 629", "country": "Spain" },
    { "confirmed": "197, 675", "country": "Italy" },
    { "confirmed": "161, 665", "country": "France" },
    { "confirmed": "157, 495", "country": "Germany" },
    { "confirmed": "154, 032", "country": "United Kingdom" },
    { "confirmed": "154, 032", "country": "United Arab Emirates" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "110, 130", "country": "Turkey" },
    { "confirmed": "90, 481", "country": "Iran" },
    { "confirmed": "83, 909", "country": "China" },
    { "confirmed": "80, 949", "country": "Russia" },
    { "confirmed": "61, 888", "country": "Brazil" },
    { "confirmed": "46, 866", "country": "Canada" },
    { "confirmed": "46, 134", "country": "Belgium" },
  ];
  addConfirmedData(data);
  addDeathsData(data);
  addRecoveredData(data);
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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });

    const data = [
      {
        "location":"Anhui",
        "confirmed":"100",
        "latitude": "30.6006773",
        "longitude": "117.9249002"
      },
      {
        "location": "Heibei",
        "confirmed": "1000",
        "latitude": "37.8956594",
        "longitude": "114.9042208"
      },
      {
        "location": "Hunan",
        "confirmed": "10000",
        "latitude": "27.6252995",
        "longitude": "111.8568586"
      },
      {
        "location": "Jiangxi",
        "confirmed": "100000",
        "latitude": "33.1401715",
        "longitude": "119.7889248"
      }
    ];
    addMarkers(data);
}

function addMarkers(data) {
  data.forEach(city => {
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.35,
      strokeWeight: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: { lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) },
      radius: parseInt(city.confirmed)
    });
  });
}

function addConfirmedData(data) {
  const table = document.getElementById("confirmedTableBody");
  if(table!=null){
    data.forEach(d => {
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorConfirmed'>" + d.confirmed + "</span></td><td><span class='countLocation'>" + d.country + "</span></td>";
      row.onclick = changeCountry;
      row.setAttribute("value", d.country);
      table.appendChild(row);
    });
  }
}

function addDeathsData(data) {
  const table = document.getElementById("deathsTableBody");
  if (table != null) {
    data.forEach(d => {
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorDeaths'>" + d.confirmed + "</span></td><td><span class='countLocation'>" + d.country + "</span></td>";
      row.onclick = changeCountry;
      row.setAttribute("value", d.country);
      table.appendChild(row);
    });
  }
}

function addRecoveredData(data) {
  const table = document.getElementById("recoveredTableBody");
  if (table != null) {
    data.forEach(d => {
      let row = document.createElement('tr');
      row.innerHTML = "<td><span class='countValue colorRecovered'>" + d.confirmed + "</span></td><td><span class='countLocation'>" + d.country + "</span></td>";
      row.onclick = changeCountry;
      row.setAttribute("value", d.country);
      table.appendChild(row);
    });
  }
}

function changeCountry() {
  if($(this).is('tr')) {
    if(currentCountry !== this.getAttribute('value') && !countrySelected) {
      const country = this.getAttribute('value');
      currentCountry = country;
      countrySelected = true;
      console.log("Request data for country: " + country);
    }
  } else {
    if (currentCountry !== "worldData") {
      currentCountry = "worldData";
      countrySelected = false;
      console.log("Request World data");
    }
  }
}