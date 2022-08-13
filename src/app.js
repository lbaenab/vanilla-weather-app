let current = new Date();

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[current.getDay()];
let hours = current.getHours();
let minutes = current.getMinutes();

h2.innerHTML = `${day} ${hours}:${minutes}`;
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  console.log(Math.round(response.data.main.temp));
}

let cityInput = document.querySelector("#city-input");

function newCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("#city");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
  } else {
    alert("Please enter a city name.");
  }

  fetchLocation(cityInput.value);
}

function fetchLocation(searchCity) {
  let cityName = cityInput.value;
  let units = "imperial";
  let apiKey = "a854789e87fa77e4522cbc1494195a4c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityName}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", newCity);

function searchCurrentLocation(response) {
  let city = response.cityName;
  let cityElement = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
}

function fetchCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "a854789e87fa77e4522cbc1494195a4c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(searchCurrentLocation);
}

function getCurrentLocation(position) {
  navigator.geolocation.getCurrentPosition(fetchCurrentLocation);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);
