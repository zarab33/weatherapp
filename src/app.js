let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
let day = days[now.getDay()];

let time = document.querySelector("#current-time");
time.innerHTML = `${day} ${hour}:${min}`;

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#search-city").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let temperatureElemment = document.querySelector("#temperature");
  temperatureElemment.innerHTML = `${temp}℃`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}   |`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}`;
}

function searchCityWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let apiKey = "35c9fe4bbca6be6efc58f7058c61de53";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", searchCityWeather);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `96922661d861d9750fa5dc3e30bfd358`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(currentPosition);
let currentLocation = document.querySelector("#current-btn");
currentLocation.addEventListener("click", currentPosition);

function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureH1 = document.querySelector("#temperature");
  let temperature = temperatureH1.innerHTML;
  temperatureH1.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);
