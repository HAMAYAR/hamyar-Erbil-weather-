const apiKey = '62e9456a746c4874a59cc38a5e5a90f8';
const city = 'Erbil';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            showError(`Error: ${data.message}`);
        }
    } catch (error) {
        showError('Error fetching weather data');
    }
}

function displayWeather(data) {
    const { main, weather, name, wind } = data;
    const description = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    const temperature = main.temp;
    const icon = weather[0].icon;

    document.getElementById('weather').innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon" class="weather-icon">
        <h2>${name}</h2>
        <p class="description">${description}</p>
        <p class="temp">${temperature} °C</p>
    `;

    updateElement('humidity', main.humidity);
    updateElement('wind-speed', wind.speed);
    updateElement('pressure', main.pressure);
    updateTimeBar();
}

function updateElement(id, value) {
    document.getElementById(id).textContent = value;
}

function showError(message) {
    document.getElementById('weather').textContent = message;
}

function updateTimeBar() {
    const timeElement = document.getElementById('current-time');
    const iconElement = document.getElementById('time-icon');
    const now = new Date();
    const hours = now.getHours();
    const iconSrc = hours >= 6 && hours < 18 ? 'https://img.icons8.com/ios-filled/50/000000/sun.png' : 'https://img.icons8.com/ios-filled/50/000000/moon.png';
    const iconAlt = hours >= 6 && hours < 18 ? 'Sun icon' : 'Moon icon';

    timeElement.textContent = `${hours.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    iconElement.src = iconSrc;
    iconElement.alt = iconAlt;
}

getWeather();
setInterval(updateTimeBar, 60000);
