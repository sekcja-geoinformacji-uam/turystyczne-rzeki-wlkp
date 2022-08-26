import { bazy, rzeki } from "./data.js";

const map = L.map("map").setView([53.05339, 16.73201], 9);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

L.geoJSON(bazy).addTo(map);
L.geoJSON(rzeki).addTo(map);
