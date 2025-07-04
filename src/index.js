function displaySearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", displaySearchInput);

function searchCity(city) {
  let apiKey = "a3f9ff86f4t0ab9cbe395o06803b6fc9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function updateWeatherInfo(response) {
  let currentTemperature = document.querySelector("#current-temp-value");
  let temperature = response.data.temperature.current;
  currentTemperature.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#weather-condition");
  conditionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#weather-humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#weather-wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )} °C`;

  let timeElement = document.querySelector("#time-day");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = dateFormat(date);

  let iconElement = document.querySelector("#current-temp-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  fetchForecast(response.data.city);
}

function dateFormat(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function fetchForecast(city) {
  apiKey = "a3f9ff86f4t0ab9cbe395o06803b6fc9";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function dayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 4) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
    <div class="forecast-date">${dayFormat(day.time)}</div>
     <img src="${day.condition.icon_url}" 
     class="forecast-icon" />
     <div class="forecast-temperatures">
     <div class="forecast-max-temp">
     ${Math.round(day.temperature.maximum)}°</div>
     <div class="forecast-min-temp">
     ${Math.round(day.temperature.minimum)}°</div>
     </div>
     </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Cape Town");
displayForecast();
