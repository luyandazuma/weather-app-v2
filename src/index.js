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
  let apiUrl =
    `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
  humidityElement.innerHTML = response.data.temperature.humidity + "%";

  let windElement = document.querySelector("#weather-wind");
  windElement.innerHTML = response.data.wind.speed + "km/h";

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like) + "°C";
}

searchCity("Durban");
