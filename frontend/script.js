const api1 = 'https://8k153r2mp0.execute-api.us-east-2.amazonaws.com/stage/current_weather_service/current-weather';
const api2 = 'https://8k153r2mp0.execute-api.us-east-2.amazonaws.com/stage/forecast_service';
const api3 = 'https://8k153r2mp0.execute-api.us-east-2.amazonaws.com/stage/historical_weather_service';
// const api1 = 'http://localhost:443/current-weather';
// const api2 = 'http://localhost:80/forecast';
// const api3 = 'http://localhost:3000/historical';

async function getCurrentWeather() {
    const lat = document.getElementById('latInput').value;
    const long = document.getElementById('longInput').value;
    const response = await fetch(`${api1}?lat=${lat}&long=${long}`);
    const data = await response.json();
    displayOutput(data);
}

async function getForecast() {
    const response = await fetch(`${api2}`);
    const { data } = await response.json();
    displayOutput(data);
}

async function getHistoricalWeather() {
    const date = document.getElementById('historyDate').value;
    const response = await fetch(`${api3}?date=${date}`);
    const { data } = await response.json();
    displayOutput(data);
}

function displayOutput(data) {
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}
