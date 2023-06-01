# Weather Dashboard

![Weather Dashboard Demo](assets/images/app.gif)

This is a weather dashboard application that allows users to search for cities and view current and future weather conditions. The application retrieves weather data from the OpenWeatherMap API and dynamically updates the HTML and CSS to display the weather information.

## Features

- Search for a city: Users can enter the name of a city in the search input to retrieve weather information for that city.
- Display current weather conditions: The application shows the city name, date, temperature, humidity, wind speed, and an icon representation of the weather conditions for the selected city.
- Show future weather forecast: The application displays a 5-day forecast that includes the date, an icon representation of the weather conditions, temperature, wind speed, and humidity.
- Search history: The application keeps track of the search history and allows users to click on a city in the search history to view its current and future weather conditions again.

## Technologies Used

- HTML
- CSS (Bootstrap)
- JavaScript

## Usage

To use the Weather Dashboard application, follow these steps:

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser.
3. Enter the name of a city in the search input and press Enter or click the Search button.
4. View the current weather conditions and the 5-day forecast for the selected city.
5. To view the weather conditions for a previously searched city, click on the city name in the search history section.

## API Configuration

This application uses the OpenWeatherMap API to retrieve weather data. You will need to obtain an API key from OpenWeatherMap by creating an account on their website. Once you have the API key, replace the placeholder `API_KEY` in the JavaScript code with your actual API key.

```javascript
const apiKey = "API_KEY";
```

## Credits

-OpenWeatherMapAPI - Used to retrieve weather data.
-Font Aweson - Used for weather icons.
-Bootstrap - Used for CSS styling.

## Deployed Application

https://ss0110.github.io/weather-dashboard/
