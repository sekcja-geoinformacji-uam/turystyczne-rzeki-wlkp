import { opisRzek, bazy, rzeki } from "./data.js"

const map = L.map("map").setView([53.05339, 16.73201], 9);

L.tileLayer('https://api.mapbox.com/styles/v1/czaj0206/cl8hl5pc8001h15o9l813ko77/tiles/512/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY3phajAyMDYiLCJhIjoiY2w4aGF4NndsMHc0cjNucXh4OXY0bHNoOCJ9.eQduJu3QP2jeEP8C2gJmDg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY3phajAyMDYiLCJhIjoiY2w4aGF4NndsMHc0cjNucXh4OXY0bHNoOCJ9.eQduJu3QP2jeEP8C2gJmDg'

}).addTo(map);

const zwaLayer = L.geoJSON(rzeki, {
  filter: zwaFilter,
  color: '#87CEFA',
  weight: 4,
  lineJoin: 'round',
  onEachFeature: function (feature, layer) {
    // layer.setText(feature.properties.name, {
    //   center: true,
    //   offset: 5,
    //   attributes: {
    //   "font-size": "18"
    // }})
    layer.bindPopup('<h4>'+feature.properties.name+'</h4><p> '+ opisRzek[feature.properties.name]+'</p>');
  }
})
const zwbLayer = L.geoJSON(rzeki, {
  filter: zwbFilter,
  color: '#1E90FF',
  weight: 3,
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h4>'+feature.properties.name+'</h4><p> '+ opisRzek[feature.properties.name]+'</p>')
  }
})
const zwcLayer = L.geoJSON(rzeki, {
  filter: zwcFilter,
  color: '#4169E1',
  weight: 2,
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h4>'+feature.properties.name+'</h4><p> '+ opisRzek[feature.properties.name]+'</p>')
  }
})
const zwalkiLayer = L.geoJSON(rzeki, {
  filter: zwalkiFilter,
  color: '#0000FF',
  weight: 2,
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h4>'+feature.properties.name+'</h4><p> '+ opisRzek[feature.properties.name]+'</p>')
  }
})

const ikona_bazy =  L.icon ({
  iconUrl: 'images/ciemna_ikona.png',
	iconRetinaUrl: 'images/ciemna_ikona.png',
	iconSize: [40, 40],
	iconAnchor: [10, 10],
	popupAnchor: [10, 10],
})


const bazyLayer = L.geoJSON(bazy, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, 
      {icon: ikona_bazy});
  },
  onEachFeature: function (feature, layer) {
      layer.bindPopup('<h5>'+feature.properties.nazwa+'</h5><p> Telefon: '+feature.properties.telefon+'</p>');
  }
})

function zwaFilter(feature) {
  if (feature.properties.Trudność === "ZWA") return true
}

function zwbFilter(feature) {
  if (feature.properties.Trudność === "ZWB") return true
}

function zwcFilter(feature) {
  if (feature.properties.Trudność === "ZWC") return true
}

function zwalkiFilter(feature) {
  if (feature.properties.Trudność === "zwałki") return true
}

zwaLayer.addTo(map)
zwbLayer.addTo(map)
zwcLayer.addTo(map)
zwalkiLayer.addTo(map)
bazyLayer.addTo(map)

const rzekiSwitch = document.getElementById("rzekiSwitch");
const bazySwitch = document.getElementById("bazySwitch");
const zwaCheck= document.getElementById("zwaCheck");
const zwbCheck= document.getElementById("zwbCheck");
const zwcCheck= document.getElementById("zwcCheck");
const zwalkiCheck= document.getElementById("zwalkiCheck");

function switchRzekiLayers() {
  const layers = [zwaLayer, zwbLayer, zwcLayer, zwalkiLayer]
  const values = ['zwa', 'zwb', 'zwc', 'zwalki']
  if (!rzekiSwitch.checked) {
    for (let layer = 0; layer <= layers.length; layer++) {
      map.removeLayer(layers[layer])
    }
  }
  if (rzekiSwitch.checked) {
    for (let value = 0; value <= values.length; value++){
      switchFilters(values[value])
    }
  }
}

function switchBazyLayers() {
  if (bazySwitch.checked) {
    bazyLayer.addTo(map)
  } else {
    map.removeLayer(bazyLayer)
  }
}

function switchFilters(filter) {
  const values = {
    'zwa': [zwaCheck, zwaLayer],
    'zwb': [zwbCheck, zwbLayer],
    'zwc': [zwcCheck, zwcLayer],
    'zwalki': [zwalkiCheck, zwalkiLayer],
  }
    if (values[filter][0].checked) {
      values[filter][1].addTo(map);
    } else if (!values[filter][0].checked) {
      map.removeLayer(values[filter][1])
    }
}

rzekiSwitch.addEventListener('change', () => switchRzekiLayers())
bazySwitch.addEventListener('change',  () => switchBazyLayers())
zwaCheck.addEventListener('change', () => switchFilters('zwa'))
zwbCheck.addEventListener('change', () => switchFilters('zwb'))
zwcCheck.addEventListener('change', () => switchFilters('zwc'))
zwalkiCheck.addEventListener('change', () => switchFilters('zwalki'))