const APIKey = "7dc2f275af3b7b59d90aebc6f6275e2a"; // Your OpenWeatherMap API key

// Function to check the weather for a given city
async function checkWeather(city) {
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${APIKey}`; // API URL with the city and API key
    const response = await fetch(APIUrl); // Fetching data from the API
    const data = await response.json(); // Parsing the JSON response

    console.log(data); // Logging the data for debugging purposes

    // Selecting DOM elements
    const container = document.querySelector('.container');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');

    // If the city is not found (status code 404), display error message
    if (data.cod === "404") {
        container.style.height = '400px'; // Adjust container height
        weatherBox.classList.remove('active'); // Hide weather box
        weatherDetails.classList.remove('active'); // Hide weather details
        error404.classList.add('active'); // Show error message
        return;
    }

    error404.classList.remove('active'); // Hide error message

    // Selecting elements for weather information
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    // Update weather icon based on the weather condition
    switch (data.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        case 'Clouds':
            image.src = 'images/cloudy.png';
            break;
        case 'Mist':
            image.src = 'images/windy.png';
            break;
        case 'Haze':
            image.src = 'images/windy.png';
            break;
        default:
            image.src = 'images/cloudy.png';
    }

    // Update weather details in the DOM
    temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`; // Temperature
    description.innerHTML = `${data.weather[0].description}`; // Description
    humidity.innerHTML = `${data.main.humidity}%`; // Humidity
    wind.innerHTML = `${Math.round(data.wind.speed)} Km/h`; // Wind speed

    // Show the weather box and details
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    container.style.height = '555px'; // Reset container height
}

// Add event listener to the search button
const searchButton = document.querySelector('.search-box button');
searchButton.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value; // Get the city from the input field
    if (city) {
        checkWeather(city); // Call checkWeather function if the input is not empty
    }
});
