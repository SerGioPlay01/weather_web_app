// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = "55c36a53e6364c05b55101157232107";
let apiUrl = '';


async function getWeatherData(city) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeather(city) {
    const cityInput = document.getElementById('cityInput').value;

    async function fetchWeatherData(city) {
        apiUrl = `https://api.weatherapi.com/v1/current.json?key=55c36a53e6364c05b55101157232107&q=${cityInput}&aqi=no`;
        const weatherData = await getWeatherData(city);

        const locationElement = document.getElementById('location');
        locationElement.innerHTML = 'Местоположение:  ' + '<br> ' + weatherData.location.name + ',  ' + ' ' + weatherData.location.region + ',  ' + weatherData.location.country;

        const timeElement = document.getElementById('time');
        timeElement.innerHTML = 'Часовой пояс:  ' + '<br> ' + weatherData.location.tz_id  + ' <br> <br> ' + ' Местное время:' + '<br> ' + weatherData.location.localtime;

        const temperatureElement = document.getElementById('temperature');
        temperatureElement.innerHTML = 'Температура воздуха:  ' + '<br> ' + weatherData.current.temp_c + '°C ';

        const descriptionElement = document.getElementById('description');
        descriptionElement.innerHTML = `<img src='${weatherData.current.condition.icon}'>` + '<br> ' + weatherData.current.condition.text;
    }

    if (city) {
        fetchWeatherData(city);
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    updateWeather();
});

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    if (city !== '') {
        updateWeather(city);
    }
});
