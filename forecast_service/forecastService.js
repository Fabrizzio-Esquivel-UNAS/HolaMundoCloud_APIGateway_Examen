const axios = require('axios');

module.exports = async function getForecast(lat, long) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&past_days=7&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const response = await axios.get(url);
    return response.data;
};
