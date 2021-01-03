// We create the street view tile layer that will be the default background of our map.
// use the Mapbox Styles API
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
// Use the Mapbox Styles API
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };
  
  // Create the map object with center, zoom level and default layer.
  let map = L.map('mapid', {
      center: [30, 30],
      zoom: 2,
      layers: [streets]
  })
  
  // Pass our map layers into our layers control and add the layers control to the map.
  // control.layers from leaflet
  // baseMaps is the base layer object which will allow the two different map styles to be show on the index.html file.
  L.control.layers(baseMaps).addTo(map);
  
  // Accessing the airport GeoJSON URL
  let airportData = "https://raw.githubusercontent.com/toainn92/Mapping_Earthquakes/main/majorAirports.json";
  
  // Grabbing our GeoJSON data.
  d3.json(airportData).then(function(data) {
      console.log(data);
      // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h2>Airport Code: " + feature.properties.faa + "<h2><hr><h3>Airport Name: " + feature.properties.name + "<h3>");
        }
    }).addTo(map);
  });


