const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = '0d3655c2bfc9d1a3fd8305bf775ec153';
const WEATHER_API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/`;
const GEO_API_URL = `${proxy}https://darksky.net/geo?q=`;
const ADDRESS_API_URL = `${proxy}https://darksky.net/rgeo?hires=1`;

function getCoordinates(location) {
  return fetch(`${GEO_API_URL}${location}`)
    .then(response => response.json());
}

function getForecast(lat, lon) {
  return fetch(`${WEATHER_API_URL}${lat},${lon}?units=auto`)
    .then(response => response.json());
}

function getAddress(lat, lon) {
  return fetch(`${ADDRESS_API_URL}&lat=${lat}&lon=${lon}`)
    .then(response => response.json());
}

function getEmbedURL(lat, lon) {
  return `https://maps.darksky.net/@temperature,${lat},${lon},7?domain=%22+encodeURIComponent(window.location.href)+%22&auth=1545205869_3ae197ed33ace3af2d099a0f3096d4a4&embed=true&timeControl=false&fieldControl=false&defaultField=temperature&defaultUnits=_c`;
}

export default {
  getForecast,
  getCoordinates,
  getAddress,
  getEmbedURL,
};
