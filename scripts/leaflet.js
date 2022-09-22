import { bazy, rzeki } from "./data.js";

const map = L.map("map").setView([53.05339, 16.73201], 9);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

const rzekiLayer = L.geoJSON(rzeki)
const bazyLayer = L.geoJSON(bazy)

rzekiLayer.addTo(map)
bazyLayer.addTo(map)

const rzekiSwitch = document.getElementById("rzekiSwitch")
const bazySwitch = document.getElementById("bazySwitch")

function switchLayers(layer) {
  const values = {
    'rzeki': [rzekiSwitch, rzekiLayer],
    'bazy': [bazySwitch, bazyLayer]
  };
  if (values[layer][0].checked) {
    values[layer][1].addTo(map)
  } else if (!values[layer][0].checked){
    map.removeLayer(values[layer][1])
  }
}

rzekiSwitch.addEventListener('change', () => switchLayers('rzeki'))
bazySwitch.addEventListener('change',  () => switchLayers('bazy'))

///do poprawki - popupy z danymi
L.geoJson(bazyLayer, {
	style: function (nazwa) {
		return {color: feature.properties.color};
	},
	onEachFeature: function (name, bazyLayer) {
		layer.bindPopup('<h1>'+feature.properties.nazwa+'</h1><p> name: '+feature.properties.telefon+'</p>');
	}
}).addTo(map);

