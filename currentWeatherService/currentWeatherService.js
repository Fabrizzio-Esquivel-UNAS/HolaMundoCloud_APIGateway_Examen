const axios = require('axios');

module.exports = async function getCurrentWeather(lat, long) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m`;
    const response = await axios.get(url);
    return response.data;
};
