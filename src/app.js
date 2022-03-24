function updateDateTime() {
  let todaysDate = new Date();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[todaysDate.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[todaysDate.getMonth()];

  let date = todaysDate.getDate();
  let hour = todaysDate.getHours();
  if (hour < 10) {
    hour = `0{hours}`;
  }
  let minutes = todaysDate.getMinutes();
  if (minutes < 10) {
    minutes = `0{minutes}`;
  }
  let year = todaysDate.getFullYear();

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hour}:${minutes}`;
}
updateDateTime();

//function convertToFahrenheit(event) {
// event.preventDefault();
// let temperatureElement = document.querySelector("#temperature");
// temperatureElement.innerHTML = 23;
//}

//function convertToCelsius(event) {
// event.preventDefault();
// let temperatureElement = document.querySelector("#temperature");
// temperatureElement.innerHTML = -5;
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

//updated
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind}mph`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  let apiKey = "358bb59892afa5069bcb43f658651551";
  let units = "imperial";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

function showPositionWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind}mph`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function showPosition(position) {
  console.log(position);
  let long = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiKey = "358bb59892afa5069bcb43f658651551";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showPositionWeather);
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let showPositionButton = document.querySelector("#current-location");
showPositionButton.addEventListener("click", getPosition);
