<template>
  <div class="home">
    <div class="row">
      <div class="col-8 offset-2">
        <div class="input-group mb-3">
          <input v-model="location" type="text" class="form-control" placeholder="Enter Location">
          <div class="input-group-append">
            <button @click="updateLocation" class="btn btn-outline-secondary" type="button">Search</button>
          </div>
        </div>
      </div>
      <div class="col-8 offset-2 text-center" v-if="forecast">
        <div class="card text-white bg-secondary mb-3">
          <div class="card-header">{{address}}</div>
          <div class="card-body">
            <h4 class="card-title icon-temp">{{forecast.currently.summary}} | 
              {{forecast.currently.temperature}} °C</h4>
            <div class="card-text">
              {{icons[forecast.currently.icon]}}
            </div>
            <div class="card-text">
              Humidity: {{forecast.currently.humidity}} % | Dew-Point: {{forecast.currently.dewPoint}} °C
            </div>
            <div class="card-text">
              Precipitation: {{forecast.currently.precipProbability}} %
            </div>
            <div class="card-text">
              Windspeed: {{forecast.currently.windSpeed}} kmh | Direction: {{forecast.currently.windBearing}} °
            </div>
            <div class="card-text">
              Pressure: {{forecast.currently.pressure}} hPa
            </div>
            <div class="card-text">
              UV-Index: {{forecast.currently.uvIndex}} 
            </div>
          </div>
        </div>
      </div>
      <div class="col-8 offset-2">
        <iframe id='map-embed-iframe' frameborder='0' height='500px' width='100%' :src="embedURL"></iframe>
      </div>
    </div>
    <!-- <pre>{{forecast}}</pre> -->
  </div>
</template>

<script>
import API from '@/lib/API';

export default {
  name: 'home',
  data() {
    return {
      embedURL: '',
      location: localStorage.location || '',
      address: localStorage.address || '',
      forecast: null,
      icons: {
        // 'clear-day': `<i class="fas fa-sun"></i>`,
        // 'clear-night': `<i class="fas fa-moon"></i>`,
        // rain: `<i class="fas fa-cloud-showers-heavy"></i>`,
        // snow: `<i class="fas fa-snowflake"></i>`,
        // sleet: `<i class="fas fa-cloud-meatball"></i>`,
        // wind: `<i class="fas fa-wind"></i>`,
        // fog: `<i class="fas fa-stream"></i>`,
        // cloudy: `<i class="fas fa-cloud"></i>`,
        // 'partly-cloudy-day': `<i class="fas fa-cloud-sun"></i>`,
        // 'partly-cloudy-night': `<i class="fas fa-cloud-moon"></i>`
      }
    };
  },
  mounted() {
    this.loadWeather(localStorage.lat || '48.1371',localStorage.lon || '11.5754');
  },
  methods: {
    loadWeather(lat, lon) {
      localStorage.lat = lat;
      localStorage.lon = lon;

      this.embedURL = API.getEmbedURL(lat, lon);

      API.getAddress(lat, lon).then(result => {
        this.address = [result.name, result.street].join(' ');
        localStorage.address = this.address;
      });
      API.getForecast(lat, lon).then(result => {
        this.forecast = result;
      });
    },
    updateLocation() {
      localStorage.location =  this.location;
      API.getCoordinates(this.location).then(result => {
        this.loadWeather(result.latitude, result.longitude);
      });
    }
  },
};
</script>

<style>
body {
  font-size: 1.1em;
}
.icon-temp {
  font-size: 2em;
}
</style>
