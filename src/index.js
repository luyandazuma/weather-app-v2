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
    "https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric";
  axios.get(apiUrl).then(updateWeatherInfo);
}

function updateWeatherInfo(response) {
console.log(response.data);
}
