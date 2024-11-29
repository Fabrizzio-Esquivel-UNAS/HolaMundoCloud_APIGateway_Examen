const axios = require('axios');

module.exports = async function getHistoricalWeather(lat, long, date) {
    const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${lat}&longitude=${long}&start_date=${date}&end_date=${date}&hourly=temperature_2m`;
    const response = await axios.get(url);
    return response.data;
};
