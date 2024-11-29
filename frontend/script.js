const api1 = 'https://4zpg6n3j9h.execute-api.us-east-2.amazonaws.com/stage/instance1';
const api2 = 'https://4zpg6n3j9h.execute-api.us-east-2.amazonaws.com/stage/instance1_5';
const api3 = 'https://4zpg6n3j9h.execute-api.us-east-2.amazonaws.com/stage/instance2';

async function getCurrentWeather() {
    const lat = document.getElementById('latInput').value;
    const long = document.getElementById('longInput').value;
    const response = await fetch(`${api1}/current-weather?lat=${lat}&long=${long}`);
    const data = await response.json();
    displayOutput(data);
}

async function getForecast() {
    const response = await fetch(`${api2}/forecast`);
    const { data, elapsed } = await response.json();
    displayOutput({ elapsedTime: `${elapsed} ms`, data });
}

async function getHistoricalWeather() {
    const date = document.getElementById('historyDate').value;
    const response = await fetch(`${api3}/historical?date=${date}`);
    const { data, elapsed } = await response.json();
    displayOutput({ elapsedTime: `${elapsed} ms`, data });
}

function displayOutput(data) {
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}
