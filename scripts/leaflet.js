import { opisRzek, bazy, rzeki } from "./data.js"


const map = L.map("map").setView([53.05339, 16.73201], 9);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const zwaLayer = L.geoJSON(rzeki, {
  filter: zwaFilter,
  color: 'blue',
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
  color: 'yellow',
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h4>'+feature.properties.name+'</h4><p> '+ opisRzek[feature.properties.name]+'</p>')
  }
})
const zwcLayer = L.geoJSON(rzeki, {
  filter: zwcFilter,
  color: 'red',
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h4>'+feature.properties.name+'</h4><p> '+ opisRzek[feature.properties.name]+'</p>')
  }
})
const zwalkiLayer = L.geoJSON(rzeki, {
  filter: zwalkiFilter,
  color: 'brown',
  onEachFeature: function (feature, layer) {
    layer.bindPopup('<h4>'+feature.properties.name+'</h4><p> '+ opisRzek[feature.properties.name]+'</p>')
  }
})

const bazyLayer = L.geoJSON(bazy, {
  onEachFeature: function (feature, layer) {
      layer.bindPopup('<h1>'+feature.properties.nazwa+'</h1><p> Telefon: '+feature.properties.telefon+'</p>');
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