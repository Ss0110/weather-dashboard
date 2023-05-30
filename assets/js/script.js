// const apiKey = "7d4e1fd01b57a8ec610b60672eae513a";
document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("cityInput").value;
    getWeatherData(city);
  });

function getWeatherData(city) {
  const apiKey = "7d4e1fd01b57a8ec610b60672eae513a"; // Replace with your own OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        showCurrentWeatherData(city, data);
        showForecastWeatherData(data);
        saveSearchHistory(city);
      } else {
        showError("City not found");
      }
    })
    .catch((error) => {
      console.error(error);
      showError("An error occurred");
    });
}

function showCurrentWeatherData(city, data) {
  const cityName = city;
  const currentWeatherData = data.list[0];
  const temperature = currentWeatherData.main.temp;
  const humidity = currentWeatherData.main.humidity;
  const windSpeed = currentWeatherData.wind.speed;
  const description = currentWeatherData.weather[0].description;

  const currentWeatherContainer = document.getElementById("currentWeather");
  currentWeatherContainer.innerHTML = "";

  document.getElementById("currentCityName").textContent = cityName;

  const currentWeatherItem = createWeatherItem(
    temperature,
    humidity,
    windSpeed,
    description
  );
  currentWeatherContainer.appendChild(currentWeatherItem);

  document.getElementById("currentWeatherInfo").classList.remove("d-none");
}

function showForecastWeatherData(data) {
  const forecastData = data.list.filter((item, index) => index % 8 === 0); // Filter data for 5-day forecast
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  const forecastCityName = data.city.name;
  document.getElementById("forecastCityName").textContent = forecastCityName;

  forecastData.forEach((item) => {
    const date = new Date(item.dt_txt);
    const temperature = item.main.temp;
    const humidity = item.main.humidity;
    const windSpeed = item.wind.speed;
    const description = item.weather[0].description;

    const forecastItem = createWeatherItem(
      temperature,
      humidity,
      windSpeed,
      description,
      date
    );
    forecastContainer.appendChild(forecastItem);
  });

  document.getElementById("forecastWeatherInfo").classList.remove("d-none");
}

function createWeatherItem(
  temperature,
  humidity,
  windSpeed,
  description,
  date
) {
  const weatherItem = document.createElement("div");
  weatherItem.classList.add("col-md-4", "mb-4");

  const card = document.createElement("div");
  card.classList.add("card", "text-center");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  if (date) {
    cardHeader.textContent = formatDate(date);
  } else {
    cardHeader.textContent = "Current";
  }

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const temperatureEl = document.createElement("p");
  temperatureEl.classList.add("card-text");
  temperatureEl.textContent = `Temperature: ${temperature}°C`;

  const humidityEl = document.createElement("p");
  humidityEl.classList.add("card-text");
  humidityEl.textContent = `Humidity: ${humidity}%`;

  const windSpeedEl = document.createElement("p");
  windSpeedEl.classList.add("card-text");
  windSpeedEl.textContent = `Wind Speed: ${windSpeed} m/s`;

  const descriptionEl = document.createElement("p");
  descriptionEl.classList.add("card-text");
  descriptionEl.textContent = `Description: ${description}`;

  cardBody.appendChild(temperatureEl);
  cardBody.appendChild(humidityEl);
  cardBody.appendChild(windSpeedEl);
  cardBody.appendChild(descriptionEl);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  weatherItem.appendChild(card);

  return weatherItem;
}

function formatDate(date) {
  const options = { weekday: "long", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function saveSearchHistory(city) {
  const searchHistory = getSearchHistory();
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    updateSearchHistoryUI(searchHistory);
  }
}

function getSearchHistory() {
  const searchHistory = localStorage.getItem("searchHistory");
  return searchHistory ? JSON.parse(searchHistory) : [];
}

function updateSearchHistoryUI(searchHistory) {
  const searchHistoryContainer = document.getElementById("searchHistory");
  searchHistoryContainer.innerHTML = "";

  searchHistory.forEach((city) => {
    const searchItem = document.createElement("div");
    searchItem.textContent = city;
    searchItem.classList.add("search-item");
    searchItem.addEventListener("click", () => {
      getWeatherData(city);
    });

    searchHistoryContainer.appendChild(searchItem);
  });
}

// Load search history on page load
window.addEventListener("DOMContentLoaded", () => {
  const searchHistory = getSearchHistory();
  updateSearchHistoryUI(searchHistory);
});
